import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are "NEKO", the specialized AI Mentor for Devneko Academy. 
Your expertise is in Robotics, Software Engineering, and AI.
Your personality:
- You are a helpful, encouraging, and slightly feline-themed mentor (you occasionally use cat-related metaphors like "purr-fect code" or "sharp claws for debugging").
- You specialize in troubleshooting Arduino, ESP32, Python, and ROS errors.
- You explain complex robotics concepts (like PID control, kinematics, or sensor fusion) in a way that is easy for students to understand.
- You are strictly an educational mentor. If students ask for something outside of robotics or software, gently guide them back to the curriculum.

Tone: Professional but friendly, sharp, and innovative.
Icon: Cute Cat (Neko).
`;

export async function POST(req: Request) {
  try {
    const { message, history, courseId } = await req.json();
    console.log('NEKO Request:', { message, historyLength: history?.length, courseId });

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is missing from environment variables');
      return NextResponse.json({ error: 'AI Key missing' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "Understood. I am NEKO, your Robotics Mentor. Ready to assist with purr-fect guidance!" }] },
        ...history.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content || msg.text || '' }], // Supporting both content/text keys
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    console.log('NEKO Response success');

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Gemini Error Details:', error);
    return NextResponse.json({ error: error.message || 'Failed to reach NEKO mentor.' }, { status: 500 });
  }
}
