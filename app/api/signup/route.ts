import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const signupData = await request.json();

    const fs = require("fs");
    let signupdata = fs.readFileSync("app/signup.json","utf-8");
    let data = JSON.parse(signupdata);
    data.push(signupData);


    const filePath = path.join(process.cwd(), 'app', 'signup.json');
    

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}