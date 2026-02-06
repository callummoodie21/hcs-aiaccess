import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        const profilePath = path.resolve(
            process.cwd(),
            "app",
            "signup.json"
        );

        if (!fs.existsSync(profilePath)) {
            return NextResponse.json(
                { success: false, error: "No users registered yet. Please sign up first." },
                { status: 404 }
            );
        }

        const file = fs.readFileSync(profilePath, "utf-8");
        const userProfile = JSON.parse(file);

        if (
            userProfile.email.toLowerCase() === email.toLowerCase() &&
            userProfile.password === password
        ) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

    } catch (err) {
        console.error("Traditional login error:", err);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}