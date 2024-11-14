import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { department, subject, content } = await request.json();

    const messages = [
        { role: 'system', content: 'You are an AI that generates formal letters for government departments.' },
        { role: 'user', content: `Write a formal letter to the ${department} department regarding ${subject}. Details: ${content}` },
    ];

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: messages,
                max_tokens: 300,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        console.log(data);
        const letter = data.choices?.[0]?.message?.content || data.error.message || 'Unable to generate letter.';

        return NextResponse.json({ letter });
    } catch (error) {
        console.error("Error generating letter:", error);
        return NextResponse.json(
            { message: 'There was an error generating your letter.' },
            { status: 500 }
        );
    }
}
