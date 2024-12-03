// Importing the tickets database and Next.js request/response utilities
import tickets from "@/app/database"; // The tickets data (mock database)
import { NextRequest, NextResponse } from "next/server"; // Used to handle server-side requests and responses in Next.js

// GET handler for searching tickets by a query
// Example path: /api/ticket/search?query=hello
// This would search for tickets with "hello" in their name
export async function GET(request: NextRequest) {
    // Get the query parameters from the request's URL
    const searchParams = request.nextUrl.searchParams;

    // Extract the "query" parameter from the URL
    const query = searchParams.get("query");

    // If no query is provided, return all tickets as the response
    if (!query) return NextResponse.json(tickets);

    // Filter the tickets array based on whether the ticket name includes the query string
    // The query string is case-insensitive
    const filteredTickets = tickets.filter((ticket) =>
        ticket.name.toLowerCase().includes(query.toLowerCase())
    );

    // Return the filtered tickets as a JSON response
    return NextResponse.json(filteredTickets);
}
