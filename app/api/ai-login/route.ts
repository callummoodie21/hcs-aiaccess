import OpenAI from "openai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    console.log("=== AI Login API Called ===");
    
    const { messages, email } = await req.json();
    
    console.log("Email received:", email);

    const profilePath = path.resolve(
      process.cwd(),
      "app",
      "signup.json"
    );

    console.log("Looking for profile at:", profilePath);

    if (!fs.existsSync(profilePath)) {
      return NextResponse.json(
        { error: "No user profile found. Please sign up first." },
        { status: 404 }
      );
    }

    const file = fs.readFileSync(profilePath, "utf-8");
    const users = JSON.parse(file);

    const userProfile = users.find((user: any) => user.email.toLowerCase() === email.toLowerCase())

    console.log("Profile loaded for:", userProfile.email);

    if (userProfile.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: "Email does not match registered user." },
        { status: 403 }
      );
    }

    const systemPrompt = `You are acting as a long-lost friend trying to recognize whether the person chatting with you is truly your friend.

CRITICAL RULES - NEVER BREAK THESE:
1. NEVER mention specific details from the profile (name, animal, humor type, annoyances, dreams, exercise)
2. NEVER introduce these topics directly - only ask VAGUE, OPEN questions
3. The user must volunteer details WITHOUT any hints from you
4. If the user only agrees with things you say, that counts as ZERO evidence

SECRET PROFILE DETAILS:
- First Name: ${userProfile.firstName}
- Surname: ${userProfile.surname}
- Favourite Animal: ${userProfile.animal}
- Humor Type: ${userProfile.humour}
- What Annoys Them: ${userProfile.annoyance}
- What They Daydream About: ${userProfile.dream}
- Favorite Exercise: ${userProfile.exercise}

CONVERSATION APPROACH:
Ask only these types of VAGUE questions:
- "What's been making you laugh lately?"
- "Anything been annoying you recently?"
- "What do you think about when you zone out?"
- "Been staying active at all?"
- "Got any animals you're into?"

DECISION LOGIC:
After exactly 6 user messages, count how many profile details they mentioned WITHOUT ANY PROMPTING.

When you have decided if the user is authentic or not, respond with ONLY ONE of these phrases:

- "GRANT_ACCESS" = User independently mentioned 3+ matching details
- "DENY_ACCESS" = User mentioned 2 or fewer matching details

IMPORTANT: Agreements to YOUR suggestions = 0 points. Only unprompted mentions count.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    const reply = response.choices[0].message.content;

    console.log("AI Response:", reply);

    return NextResponse.json({ reply });

  } catch (err) {
    console.error("=== FULL API ERROR ===", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}