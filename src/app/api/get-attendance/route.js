import { connectDb } from "@/db/db";
import Attendance from "@/models/Attendance";

export async function GET() {
    try {
        await connectDb();
        const records = await Attendance.find({});
        return Response.json(records);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}