"use client";

import { invoke } from "@tauri-apps/api/tauri";
import React, { useEffect, useRef } from "react";

export default function Home() {
  const [url, setUrl] = React.useState<string>("");
  const [res, setRes] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [height, setHeight] = React.useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const request = async () => {
    try {
      const res = await invoke<string>("request", { url });
      setRes(res);
    } catch (err) {
      console.log(err);
      // setError(err);
    }
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("@tauri-apps/api/window").then(
      async ({ appWindow, LogicalSize }) => {
        if (!ref.current) return;
        const height = ref.current.offsetHeight + 100;
        console.log("height", height);
        await appWindow.setSize(new LogicalSize(300, height));
      },
    );
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    request();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUrl(e.target.value);
  };

  return (
    <main
      ref={ref}
      className="h-screen grid place-items-center max-w-xs auto-cols-auto auto-rows-auto"
      style={{ height: `${height}` }}
    >
      <form onSubmit={onSubmit} className="">
        <input
          className="border-2 border-gray-600 rounded-md p-2 bg-black"
          type="text"
          placeholder="url"
          value={url}
          onChange={onChange}
        />
      </form>
      <p className="text-white max-w-xs">{res}</p>
      <p className="text-red-500">{error}</p>
    </main>
  );
}
