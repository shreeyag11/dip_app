use wasm_bindgen::prelude::*;
use console_error_panic_hook::set_once as set_panic_hook;

#[wasm_bindgen]
pub fn init() {
    set_panic_hook();
}

#[wasm_bindgen]
pub fn greet(name: &str) -> Result<Vec<u8>, JsValue> {
    
    // Err(
    //     JsValue::from(format!("{:?}", vec![0, 1, 2, 3, 4]))
    // )
    
    Ok(vec![1, 2, 3])
}