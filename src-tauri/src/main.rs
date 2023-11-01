// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn request(url: String) -> String {
    println!("Requesting: {}", url);
    let response = reqwest::blocking::get(&url);
    match response {
        Err(e) => {
            println!("Error: {:?}", e);
            return format!("Error: {:?}", e);
        }
        Ok(res) => {
            let parsed_response = res.json::<HashMap<String, String>>();
            match parsed_response {
                Err(e) => return format!("Parsing error: {:?}", e),
                Ok(hash_map) => {
                    let resp_str = format!("{:#?}", hash_map);
                    println!("{}", resp_str);
                    return resp_str;
                }
            }
        }
    }
}
