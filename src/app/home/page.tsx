

import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function HomePage() {
//   const { data: session } = useSession();
  
  const feedback = await prisma.feedback.findMany({
    where: {
      user: {
        email: "abhiram"
      }
    }
  });

  return (
    <>
      <div>home page</div>
      <div>
        {feedback.map((item) => (
          // Add key prop for list items
          <div key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}