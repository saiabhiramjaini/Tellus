import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, feedback, rating, code } = body;

        if (!name || !feedback || !rating || !code) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user exists with the given code
        const user = await prisma.user.findUnique({
            where: { code: code as string }
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid code" },
                { status: 404 }
            );
        }

        // Create the feedback
        const feedbackEntry = await prisma.feedback.create({
            data: {
                name,
                feedback,
                rating,
                code: user.code, // Link to the user's code
            },
        });

        return NextResponse.json(
            { message: "Feedback submitted successfully", feedback: feedbackEntry },
            { status: 201 }
        );
    } catch (e: any) {
        // Check if error is an object and has a message property
        const errorMessage = e && e.message ? e.message : "Unknown error";

        console.error(errorMessage); // Log error message

        return NextResponse.json(
            { message: "Failed to submit feedback", error: errorMessage },
            { status: 500 }
        );
    }
}
