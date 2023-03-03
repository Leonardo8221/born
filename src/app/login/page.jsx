'use client';

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
    const { data: session } = useSession()
    console.log({ session }, 'session', process.env.NEXT_PUBLIC_CLIENT_SECRET)
    if (session) {
        return (
            <>
                Signed in as {session.user.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
export default Login;