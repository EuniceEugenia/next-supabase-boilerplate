"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useUser from "@/app/hook/useUser";
import { checkout } from "@/lib/actions/stripe";
import { useState } from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import { cn } from "@/lib/utils";


export default function Checkout({ priceId }: { priceId: string }) {
  const { data: user } = useUser();
  const router = useRouter();

const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (user?.id) {
      setLoading(true);
      const data = JSON.parse(
        await checkout(
          user.email, 
          priceId, 
          location.origin + "/success"
        ),
      );
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Fail to checkout");
      }
      setLoading(false);
    } else {
      router.push("/auth?next=" + location.pathname);
    }
  };

  return (
    <Button className="w-full flex items-center gap-2" onClick={handleCheckout}>
      Getting Started <AiOutlineLoading3Quarters className={cn("animate-spin",loading ? "block" : "hidden")}/>
    </Button>
  );
}
