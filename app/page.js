"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import Login from "@/components/LogIn";


const handleBeforeUnload = (event) => {
  event.preventDefault();
  event.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
};

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   

    window.addEventListener('beforeunload', handleBeforeUnload);

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <section className="bg-white w-[100vw] flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl">Cars Karkhana</h1>
      <p>Vehicle Information</p>
      <Link
        href="/inspect"
        className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      >
        Inspect
      </Link>
    </section>
  );
}
