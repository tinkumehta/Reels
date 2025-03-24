import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Header (){
    const {data : session} = useSession();

    const handleSignout = async () => {
        try {
            await signOut()
        } catch (error) {
            
        }
    }

    return (
        <div>
        <button onClick={handleSignout}>Signout</button>
        { session ? (
            <h2>Welcome</h2>
        ) : (
            <div>
                 <Link href="/login">Login</Link>
                 <Link href="/register">Register</Link>
            </div>
        )}
       
        </div>
    )
}