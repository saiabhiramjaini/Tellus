import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  let feedback: any = []
  if (session?.user?.email) {
    feedback = await prisma.feedback.findMany({
      where: {
        user: {
          email: session.user.email
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Feedback Aggregator</h1>
      {session ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Feedback</h2>
          {feedback.length > 0 ? (
            <ul className="space-y-4">
              {feedback.map((item: any) => (
                <li key={item.id} className="bg-gray-100 p-4 rounded">
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.feedback}</p>
                  <p>Rating: {item.rating}/5</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't submitted any feedback yet.</p>
          )}
        </div>
      ) : (
        <div>
          <p>Please log in to view and submit feedback.</p>
        </div>
      )}
      <div>
        <Link href="/feedback/new" className="text-blue-500 hover:underline">
          Submit New Feedback
        </Link>
      </div>
    </div>
  )
}

