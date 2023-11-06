// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

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
    if response.is_err() {
        return String::from("Error");
    }
    let resValue = match response {
        Ok(res) => res,
        Err(_) => return String::from("Error"),
    };

    println!("status: {}", resValue.status());
    return resValue.text().unwrap();
}
