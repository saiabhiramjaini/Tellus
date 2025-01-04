import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        if (!body || !body.username || !body.email) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const { username, email } = body;
        
        // Generate a random code
        const code = Math.floor(Math.random() * 1000000).toString();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists", user: existingUser },
                { status: 200 }
            );
        }

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                username,
                email,
                code,
            },
        });

        return NextResponse.json(
            { message: "User created successfully", user },
            { status: 201 }
        );
    } catch (e: any) {
        console.error(e);
        return NextResponse.json(
            { message: "Failed to create user", error: e.message },
            { status: 500 }
        );
    }
}