"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function TestAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name && session?.user?.email) {
      const addUserToDatabase = async () => {
        try {
          const response = await axios.post("/api/auth/signin", {
            username: session.user!.name,
            email: session.user!.email,
          });

          if (response.status === 201) {
            console.log("User added to the database successfully");
            router.push("/home");
          } else {
            console.error("Failed to add user to the database");
          }
        } catch (error) {
          console.error("Error adding user to database:", error);
        }
      };

      addUserToDatabase();
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <div>Already signed in</div>;
  }

  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}