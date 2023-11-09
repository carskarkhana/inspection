'use client'
import Link from "next/link";
 
export default function Home() {
    return (
        <section className="bg-white w-[100vw] flex flex-col justify-center items-center  ">
            <h1 className="font-bold text-2xl ">Cars Karkhana</h1>
            <p>Vehicle Information</p>
            <Link
                href="/inspect"
                class={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  `}
            >
                Inspect
            </Link>
        </section>
    );
}
