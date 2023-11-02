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
    let response = reqwest::blocking::get(&url).unwrap();
    println!("status: {}", response.status());
    return response.text().unwrap();
}
