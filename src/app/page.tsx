"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function TestAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>Signed in as {session.user!.email}</p>
        <p>{session.user?.image!}</p>
        <Image src={session.user?.image!} alt={""} width={100} height={100}/>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}