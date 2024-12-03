// Importing the tickets database and the Next.js response utility
import tickets from "@/app/database"; // This is where the tickets data is stored (mock database)
import { NextResponse } from "next/server"; // Used to handle server-side responses in Next.js

// GET handler to fetch a ticket by its ID
// Example path: /app/api/tickets/3
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    // Extract the ticket ID from the request parameters (URL path)
    const { id } = await params;

    // Find the ticket in the tickets array using the provided ID (converted to integer)
    const ticket = tickets.find((ticket) => ticket.id === parseInt(id));

    // Respond with the found ticket as JSON
    return NextResponse.json(ticket);
}

// PUT handler to update a ticket by its ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // Extract ticket ID from the request parameters
    const { id } = await params;

    // Extract new ticket data (name, status, type) from the request body
    const { name, status, type } = await request.json();

    // Find the ticket that matches the ID
    const ticket = tickets.find((ticket) => ticket.id === parseInt(id));

    // If no ticket is found, return an error response with status 404 (Not Found)
    if (!ticket) return NextResponse.json(new Error("Ticket not found"), { status: 404 });

    // If ticket is found, update the properties based on the provided data
    if (name) ticket.name = name;
    if (status) ticket.status = status;
    if (type) ticket.type = type;

    // Respond with the updated ticket as JSON
    return NextResponse.json(ticket);
}

// DELETE handler to delete a ticket by its ID
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    // Extract ticket ID from the request parameters
    const { id } = await params;

    // Find the index of the ticket to be deleted in the tickets array
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === parseInt(id));

    // If the ticket is not found, return an error response with status 404 (Not Found)
    if (ticketIndex === -1) return NextResponse.json(new Error("Ticket not found"), { status: 404 });

    // Remove the ticket from the array
    tickets.splice(ticketIndex, 1);

    // Respond with the updated tickets list (after deletion) as JSON
    return NextResponse.json(tickets);
}
