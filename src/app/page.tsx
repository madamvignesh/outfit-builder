import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col gap-[32px] items-center">
        <div>
          <h1 className="text-[32px] sm:text-[48px] font-bold text-center">
            Outfit Builder
          </h1>
          <p className="text-[16px] sm:text-[20px] text-center">
            Create your own outfit with our outfit builder!
          </p>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <Link href="/create">
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              Create
            </button>
          </Link>
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
            Cart
          </button>
        </div>
      </main>
    </div>
  );
}
