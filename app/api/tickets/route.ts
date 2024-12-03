// Importing the database (tickets) and the Next.js response utility
import tickets from "@/app/database"; // Assuming this is a mock database (an array or similar structure)
import { NextResponse } from "next/server"; // NextResponse is used to handle server-side responses in Next.js

// Asynchronous GET handler
export async function GET() {
    // Responds with the current state of the tickets database in JSON format
    return NextResponse.json(tickets);
}

// Asynchronous POST handler
export async function POST(request: Request) {
    // Parses the incoming request's JSON body to extract the new ticket data
    const ticket = await request.json();

    // Adds the new ticket to the tickets database
    // Each ticket is assigned a unique ID based on the current number of tickets in the database
    tickets.push({ id: tickets.length + 1, ...ticket });

    // Responds with the updated tickets database in JSON format
    return NextResponse.json(tickets);
}


