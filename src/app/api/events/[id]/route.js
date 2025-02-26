import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/db/db";
import Event from "@/models/event.models";
import FAQ from "@/models/faq.models";  // Import the missing models
import Partners from "@/models/partners.models";
import Prizes from "@/models/prizes.models";

export async function GET(req, { params }) {
    try {
        await connectDb(); // Ensure MongoDB is connected

        const { id } = params;
        console.log("Received ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid ObjectId:", id);
            return NextResponse.json({ error: "Invalid Event ID format" }, { status: 400 });
        }

        const event = await Event.findById(id)
            .populate("faqs")
            .populate("partners")
            .populate("prizes");

        if (!event) {
            console.log("Event not found:", id);
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        console.log("Event found:", event);
        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        console.error("❌ Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
