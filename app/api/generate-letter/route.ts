import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { department, content } = await request.json();

    // Messages for OpenAI API
    const messages = [
        { role: 'system', content: 'You are an AI that generates formal letters for government departments.' },
        // { role: 'user', content: `Write a formal letter to the ${department} department regarding ${subject}. Details: ${content}` },
        { role: 'user', content: `Write a note for approval of Secretary ${department} department regarding ${content}. also add relevant rules` },
    ];

    try {
        // Fetching OpenAI API for generating the letter
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Using public key
            },
            body: JSON.stringify({
                model: 'gpt-4', // Corrected model name
                messages: messages,
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const letter = data.choices?.[0]?.message?.content || 'No content generated.';
            return NextResponse.json({ letter });
        } else {
            const errorMessage = data.error?.message || 'Error from OpenAI API.';
            console.error("OpenAI Error:", errorMessage);
            return NextResponse.json(
                { message: errorMessage },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error generating letter:", error);
        return NextResponse.json(
            { message: 'There was an error generating your letter.' },
            { status: 500 }
        );
    }
}
