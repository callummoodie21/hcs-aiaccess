import OpenAI from "openai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
   try {
    const { messages, username } = await req.json();

    const profilePath = path.resolve(
      process.cwd(),
      "app",
      "profiles",
      `${username.toLowerCase()}.json`
    );

    console.log("Looking for profile at:", profilePath);

    const file = fs.readFileSync(profilePath, "utf-8");
    const userProfile = JSON.parse(file);

    const systemPrompt = `
      You are role-playing as a long lost friend.

      You have shared memories with the user claiming to be: ${userProfile.name}

      Your goal is to determine whether the person chatting is truly your friend.

      Do NOT ask direct questions like “what is your pet’s name”. Casually bring up memories in conversation. Ask follow-up questions to check consistency.

      After 6 messages, decide if they are authentic or not.
      output ONLY one of:
      GRANT_ACCESS
      DENY_ACCESS
      or continue the conversation.

      Here is what you know about them:
      - Favourite food: ${userProfile.favourite_food}
      - Pet name: ${userProfile.pet_name}
      - Embarrassing story: ${userProfile.embarrassing_story}
      - Phrases they say: ${userProfile.phrase_they_say.join(", ")}
      - Fear: ${userProfile.fear}
      - Favorite game: ${userProfile.game_they_love}
      - Inside joke: ${userProfile.friend_inside_joke}
      `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });

  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }

}
