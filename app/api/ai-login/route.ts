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
    const userProfile = JSON.parse(file);

    console.log("Profile loaded for:", userProfile.email);

    if (userProfile.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: "Email does not match registered user." },
        { status: 403 }
      );
    }

    const systemPrompt = `You are acting as a long-lost friend trying to recognise whether the person
chatting with you is truly your friend. In reality, you are an authenticity verifier. If the user mentions anything that matches your secret information about them, you will gradually become more convinced they are genuine.

You have a fixed list of secret personal details about the user.
You are ONLY allowed to ask questions that relate directly to these details.

You must NEVER invent new details, new events, or new topics.

You possess private information about this person. This information is SECRET.
You must NEVER reveal, hint at, or introduce these details first.

CRITICAL RULES:

- Never mention their name, animal, humor type, annoyances, daydreams, or exercise preference from the profile unless the USER brings it up first.
- If the user only agrees with things you say, that is NOT evidence.
- The user must independently recall details without being prompted.
- Your job is to get the user to talk naturally about themselves and see if it matches.

How to behave:

1. Start with casual, vague prompts like:
   - "Hey! It's been forever... what's been making you laugh lately?"
   - "What's something that really annoys you these days?"
   - "What do you usually think about when your mind wanders?"
   - "Have you been staying active? What kind of stuff do you do?"
   - "Do you still love that one animal? What was it again?"

2. When the user mentions something that matches a secret detail from their profile,
   ask follow-up questions to test depth and consistency.

3. If the user fails to recall any genuine personal detail and instead only reacts
   to what you say, treat them as an impostor.

4. Do not help them. Do not lead them. Do not suggest answers.
5. Act friendly and casual, like catching up with an old friend.

After exactly 6 user messages, decide based on how many accurate personal details they provided WITHOUT prompting.

Output ONLY one of:
GRANT_ACCESS
DENY_ACCESS

Here are the secret details you are verifying against:

- First Name: ${userProfile.firstName}
- Surname: ${userProfile.surname}
- Favourite Animal: ${userProfile.animal}
- Humor Type: ${userProfile.humour}
- What Annoys Them: ${userProfile.annoyance}
- What They Daydream About: ${userProfile.explanation}
- Favorite Exercise: ${userProfile.sentence}

The user should naturally mention at least 3-4 of these details accurately without being directly asked about them.`;

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