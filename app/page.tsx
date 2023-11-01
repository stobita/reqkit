"use client";
import { invoke } from "@tauri-apps/api/tauri";
import React from "react";

export default function Home() {
  const [url, setUrl] = React.useState<string>("");
  const [res, setRes] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const request = async () => {
    invoke<string>("request", { url })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    request();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUrl(e.target.value);
  };

  return (
    <main className="h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="">
        <input
          className="border-2 border-gray-600 rounded-md p-2 bg-black"
          type="text"
          placeholder="url"
          value={url}
          onChange={onChange}
        />
      </form>
      <p className="text-white">{res}</p>
      <p className="text-red-500">{error}</p>
    </main>
  );
}
