"use client";
import React,{ useEffect, useState } from "react";
import Main from "@/components/Main";
import { auth } from "@/app/config/firebase";
import Login from "@/components/LogIn";


const handleBeforeUnload = (event) => {
  event.preventDefault();
  event.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
};

const Page = () => {
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
        <div>
            <div className=" w-full ">
                <Main />
            </div>
        </div>
    );
};

export default Page;
