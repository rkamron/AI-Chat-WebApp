import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "Answer questions as short and quickly as possible. You must do it under 75 tokens."
}
  

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const { messages } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", {status: 500});
        }

        if (!messages) {
            return new NextResponse("Messages are required", {status: 400});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            max_tokens: 75,
            temperature: 0.5,
            messages: [instructionMessage, ...messages]
        });
        
        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}