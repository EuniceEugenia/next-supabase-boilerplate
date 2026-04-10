"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import useUser from '@/app/hook/useUser'

export default function Profile() {
  const { isFetching, data} = useUser();
  
  if (isFetching) {
    return <></>
  }

  return (
    <div>
      {!data?.id ? (
        <Link href="/auth" className='animate-fade'>
          <Button variant="outline">SignIn</Button>
        </Link>
      ) : (
        <Image src={data.image_url || ""} alt={data.display_name || ""}
        width={50}
        height={50}
        className='rounded-full animate-fade'/>
      )}
    </div>
  );
}