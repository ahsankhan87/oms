import axios from 'axios';
import { GenerateLetterRequest, GenerateLetterResponse } from '../types';

export async function generateLetter({
  department,
  subject,
  content,
}: GenerateLetterRequest): Promise<string> {
  const prompt = `Write a formal letter to the ${department} department regarding ${subject}. Details: ${content}`;
  
  try {
    const response = await axios.post<GenerateLetterResponse>(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data.letter;
  } catch (error) {
    console.error("Error generating letter:", error);
    return "There was an error generating your letter. Please try again.";
  }
}
