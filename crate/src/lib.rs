#[macro_use]
extern crate serde_derive;

use console_error_panic_hook::set_once as set_panic_hook;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn init() {
    set_panic_hook();
}
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
pub fn parse_header(file_text: &String) -> Result<FileHeaderParseResponse, JsValue> {
    let lines: Vec<&str> = file_text.split('\n').take(3).collect();
    let mut errors: Vec<String> = vec![];

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

    if lines.len() - 3 != height * width {
        errors.push(format!(
            "Expected height ({}) * width ({}) pixels (= {}), but file has {} pixels",
            height,
            width,
            height * width,
            lines.len() - 3
        ));
    }

    Ok(FileHeaderParseResponse {
        file_type: String::from(file_type),
        height,
        width,
    })
}

#[wasm_bindgen]
pub fn parse_header_json(file_text: String) -> Result<JsValue, JsValue> {
    Ok(JsValue::from_serde(&(parse_header(&file_text).unwrap())).unwrap())
}

#[allow(unreachable_patterns)]
pub fn parse_pixels(file_text: String) -> (Vec<u8>, Vec<String>) {
    let lines: Vec<&str> = file_text.split('\n').collect();

    let header = parse_header(&file_text).unwrap();
    let file_type = header.file_type;
    let height = header.height;
    let width = header.width;
    let mut errors: Vec<String> = vec![];

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

#[wasm_bindgen]
pub fn parse_pixels_json(file_text: String) -> Result<Vec<u8>, JsValue> {
    let (pixels, errors) = parse_pixels(file_text);
    
    if errors.len() != 0 {
        let errors = errors.join("#!@");
        Err(JsValue::from(errors))
    } else {
        Ok(pixels)
    }

}

pub fn render_pixels(pixels: Vec<u8>, selector: &str) -> Result<(), ()> {

    Ok(())
}
