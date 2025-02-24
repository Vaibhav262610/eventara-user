import { connectDb } from "@/db/db";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDb();

        // Read request body once
        const body = await req.json();
        const { studentId } = body;

        console.log("Received studentId:", studentId);

        if (!studentId) {
            return NextResponse.json({ success: false, message: "❌ Missing studentId!" }, { status: 400 });
        }

        // Check if attendance is already marked
        const existingRecord = await Attendance.findOne({ studentId });

        if (existingRecord?.attended) {
            return NextResponse.json({ success: false, message: "❌ Already Marked!" }, { status: 400 });
        }

        // Mark attendance (upsert ensures record creation if missing)
        const updatedRecord = await Attendance.findOneAndUpdate(
            { studentId },
            { $set: { attended: true, generatedAt: Date.now() } },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: updatedRecord });
    } catch (error) {
        console.error("Error marking attendance:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// Handle CORS and Preflight Requests
export function OPTIONS() {
    return NextResponse.json({}, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
