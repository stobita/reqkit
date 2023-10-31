import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex flex-col items-center justify-center">
        <input
          className="border-2 border-gray-300 rounded-md p-2 mb-4"
          type="text"
          placeholder="Name"
        />
      </form>
    </main>
  );
}
