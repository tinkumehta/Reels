"use client";
import React from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;



export default function Providers({children} : {children : React.ReactNode}) {

    const authenticator = async () => {
        try {
          const response = await fetch("/api/imagekit-auth");
      
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
          }
      
          const data = await response.json();
          const { signature, expire, token } = data;
          return { signature, expire, token };
        } catch (error) {
          throw new Error(`Authentication request failed: ${error}`);
        }
      };

  return (
<SessionProvider>
      <ImageKitProvider
       publicKey={publicKey} 
       urlEndpoint={urlEndpoint} 
       authenticator={authenticator}
       >
        {children}
      </ImageKitProvider>
      </SessionProvider>
  );
}