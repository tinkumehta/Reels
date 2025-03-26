"use client";
import React from "react";
import { ImageKitProvider,  } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./Notification";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;



export default function Providers({children} : {children : React.ReactNode}) {

    const authenticator = async () => {
        try {
          const res = await fetch("/api/imagekit-auth");
      
          if (!res.ok) throw new Error("Failed to authenticate");
          return res.json();
            
        } catch (error) {
          throw new Error(`Authentication request failed: ${error}`);
        }
      };

  return (
<SessionProvider refetchInterval={5 * 60}>
  <NotificationProvider>
      <ImageKitProvider
       publicKey={publicKey} 
       urlEndpoint={urlEndpoint} 
       authenticator={authenticator}
       >
        {children}
      </ImageKitProvider>
      </NotificationProvider>
      </SessionProvider>
  );
}