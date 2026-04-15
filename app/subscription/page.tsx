"use client";

import React from "react";
import useUser from "../hook/useUser";
import Post from "./components/Post";
import Price from "@/components/subscription/price";

export default function page() {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return <></>;
  }

  const isActive = !user?.subscription?.end_at
    ? false
    : new Date(user.subscription.end_at) > new Date();

  return (
    <div>
      
      <Post />
      {/* <div className="flex justify-center items-center">
        {isActive ? (
          
        ) : (
          <div className="space-y-5">
            <h1 className="text-center text-3xl font-bold">You need to subscribe to see the data</h1>
            <Price />
          </div>
        )}
      </div> */}
    </div>
  );
}
