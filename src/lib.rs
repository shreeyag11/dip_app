#[macro_use]
extern crate serde_derive;
extern crate pest;
#[macro_use]
extern crate pest_derive;

use console_error_panic_hook::set_once as set_panic_hook;
use pest::Parser;
use wasm_bindgen::prelude::*;

#[derive(Parser)]
#[grammar = "ass1.pest"]
pub struct Ass1Parser;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn init() {
    set_panic_hook();
}

// TODO: Try turning this to inspectable to get rid of JsParsing
#[derive(Serialize)]
pub struct FileHeaderParseResponse {
    file_type: String,
    height: usize,
    width: usize,
}

macro_rules! unwrap {
    ($x:expr, $e:ident, $line_no:expr) => {
        match $x {
            Ok(val) => val,
            Err(e) => {
                match e {
                    std::num::ParseIntError { .. } => {
                        $e.push(format!("At line {}: Cannot parse as a number.", $line_no));
                    }
                    _ => {
                        $e.push(format!("At line {}: {}", $line_no, e));
                    }
                };
                0
            }
        }
    };
    ($x:expr, $e:ident, $line_no:expr, $msg:expr) => {
        match $x {
            Ok(val) => val,
            Err(e) => {
                match e {
                    std::num::ParseIntError { .. } => {
                        $e.push(format!($msg, $line_no));
                    }
                    _ => {
                        $e.push(format!("At line {}: {}", $line_no, e));
                    }
                };
                0
            }
        }
    };
}

#[allow(unreachable_patterns)]
pub fn viewer_parse_header(file_text: &str) -> (FileHeaderParseResponse, Vec<String>) {
    let lines: Vec<&str> = file_text.lines().take(3).collect();
    let mut errors: Vec<String> = vec![];

    if lines.len() == 0 {
        errors.push(String::from(
            "I think the file is empty, splitting at newline gives 0 lines.",
        ));
        return (
            FileHeaderParseResponse {
                file_type: String::new(),
                height: 0,
                width: 0,
            },
            errors,
        );
    } else if lines.len() == 1 {
        errors.push(String::from("There is only a single line in the file, there need to be at least 3 for file_type, height, and width."));
        return (
            FileHeaderParseResponse {
                file_type: String::new(),
                height: 0,
                width: 0,
            },
            errors,
        );
    } else if lines.len() == 2 {
        errors.push(String::from("There is only 2 lines in the file, there need to be at least 3 for file_type, height, and width."));
        return (
            FileHeaderParseResponse {
                file_type: String::new(),
                height: 0,
                width: 0,
            },
            errors,
        );
    }

    let file_type = lines[0];

    match file_type {
        "RGB" => {}
        "G" => {}
        _ => {
            errors.push(String::from(
                "At line 1: Not a valid file type. Expected \"RGB\" or \"G\"",
            ));
        }
    };

    let height: usize = unwrap!(lines[1].parse(), errors, 2);
    let width: usize = unwrap!(lines[2].parse(), errors, 3);

    (
        FileHeaderParseResponse {
            file_type: String::from(file_type),
            height,
            width,
        },
        errors,
    )
}

#[wasm_bindgen(js_name = viewerParseHeader)]
pub fn viewer_parse_header_json(file_text: &str) -> Result<JsValue, JsValue> {
    let (res, errors) = viewer_parse_header(file_text);

    if errors.len() != 0 {
        let errors = errors.join("#!@");
        Err(JsValue::from(errors))
    } else {
        Ok(JsValue::from_serde(&res).unwrap())
    }
}

#[allow(unreachable_patterns)]
pub fn viewer_parse_pixels(file_text: &str) -> (Vec<u8>, Vec<String>) {
    let lines: Vec<&str> = file_text.lines().collect();

    let (header, errs) = viewer_parse_header(&file_text);
    let file_type = header.file_type;
    let height = header.height;
    let width = header.width;
    let mut errors: Vec<String> = vec![];
    for e in errs {
        errors.push(e);
    }

    if lines.len() - 3 != height * width {
        errors.push(format!(
            "Expected height ({}) * width ({}) pixels (= {}), but file has {} pixels",
            height,
            width,
            height * width,
            lines.len() - 3
        ));
    }

    let mut pixels: Vec<u8> = Vec::with_capacity(height * width);

    if file_type == "RGB" {
        for (no, line) in lines.iter().enumerate().skip(3) {
            let no = no + 1;

            let line = String::from(*line);
            let colors: Vec<&str> = line.split_whitespace().collect();

            if colors.len() != 3 {
                errors.push(format!(
                    "At line {}: Expected 3 color components, found {}.",
                    no,
                    colors.len(),
                ));

                continue;
            }

            let red: u8 = unwrap!(
                colors[0].parse(),
                errors,
                no,
                "At line {}: Cannot parse the red component as a number."
            );
            let green: u8 = unwrap!(
                colors[1].parse(),
                errors,
                no,
                "At line {}: Cannot parse the green component as a number."
            );
            let blue: u8 = unwrap!(
                colors[2].parse(),
                errors,
                no,
                "At line {}: Cannot parse the blue component as a number."
            );

            pixels.push(red);
            pixels.push(green);
            pixels.push(blue);
            pixels.push(255);
        }
    } else if file_type == "G" {
        for (no, line) in lines.iter().enumerate().skip(3) {
            let line = String::from(*line);
            let color = line.trim();

            let color: u8 = unwrap!(color.parse(), errors, no);

            pixels.push(color);
            pixels.push(color);
            pixels.push(color);
            pixels.push(255);
        }
    }

    (pixels, errors)
}

#[wasm_bindgen(js_name = viewerParsePixels)]
pub fn viewer_parse_pixels_json(file_text: &str) -> Result<Vec<u8>, JsValue> {
    let (pixels, errors) = viewer_parse_pixels(file_text);

    if errors.len() != 0 {
        let errors = errors.join("#!@");
        Err(JsValue::from(errors))
    } else {
        Ok(pixels)
    }
}

pub fn ass1_parse_file(file_text: &str) -> (Vec<f64>, String) {
    let mut array: Vec<f64> = Vec::with_capacity(256 * 256);
    let mut errors = String::from("");
    let file_text = file_text.replace(",", ",\n");

    let mut file = match Ass1Parser::parse(Rule::ARRAY, &file_text) {
        Ok(val) => val,
        Err(err) => {
            errors = format!("{}", err);
            return (Vec::new(), errors);
        }
    };
    let file = file // unwrap the parse result
        .next()
        .unwrap(); // get and unwrap the `file` rule; never fails

    for val in file.into_inner() {
        match val.as_rule() {
            Rule::FLOATING_POINT_NUMBER => array.push(val.as_str().parse::<f64>().unwrap()),
            Rule::OPENING_SQUARE_BRACKET => (),
            Rule::CLOSING_SQUARE_BRACKET => (),
            Rule::COMMA => (),
            Rule::EOI => (),
            _ => unreachable!(),
        }
    }

    (array, errors)
}

#[wasm_bindgen(js_name = ass1ParseFile)]
pub fn ass1_parse_file_json(file_text: &str) -> Result<Vec<f64>, JsValue> {
    let (res, errors) = ass1_parse_file(file_text);

    let err: String = errors.lines().collect::<Vec<&str>>().join("#!@");

    if errors != "" {
        Err(JsValue::from(err))
    } else {
        Ok(res)
    }
}

pub fn ass1_convert_to_csv(file_text: &str) -> (String, String) {
    // for c in file_text.chars() {
    //     if c == ',' {
    //         comma_count = comma_count + 1;
    //         if comma_count == img_width {
    //             comma_count = 0;
    //             csv.push_str(",\n");
    //         }
    //     } else {
    //         csv.push(c);
    //     }
    // }

    // csv

    let mut errors = String::from("");
    let img_width = 256usize;
    let file_text = file_text.replace(",", ",\n");
    let mut csv = String::new();
    let mut comma_count = 0;

    let mut file = match Ass1Parser::parse(Rule::ARRAY, &file_text) {
        Ok(val) => val,
        Err(err) => {
            errors = format!("{}", err);
            return (String::new(), errors);
        }
    };
    let file = file // unwrap the parse result
        .next()
        .unwrap(); // get and unwrap the `file` rule; never fails

    for val in file.into_inner() {
        match val.as_rule() {
            Rule::FLOATING_POINT_NUMBER => csv.push_str(val.as_str()),
            Rule::OPENING_SQUARE_BRACKET => (),
            Rule::CLOSING_SQUARE_BRACKET => (),
            Rule::COMMA => {
                comma_count = comma_count + 1;
                if comma_count == img_width {
                    comma_count = 0;
                    csv.push_str(",\n");
                } else {
                    csv.push(',');
                }
            }
            Rule::EOI => (),
            _ => unreachable!(),
        }
    }

    (csv, errors)
}

#[wasm_bindgen(js_name = ass1ConvertToCsv)]
pub fn ass1_convert_to_csv_json(file_text: &str) -> Result<String, JsValue> {
    let (res, errors) = ass1_convert_to_csv(file_text);

    let err: String = errors.lines().collect::<Vec<&str>>().join("#!@");

    if errors != "" {
        Err(JsValue::from(err))
    } else {
        Ok(res)
    }
}
