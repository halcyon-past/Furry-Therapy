import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

interface responseData {
    paragraph: string;
    adjectives: string[];
}

const apiKey = process.env.GEMINI_API_KEY;
const genai = new GoogleGenerativeAI(apiKey);


const generationConfig = {
    temperature: 0.1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

const model = genai.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig,
});


export async function POST(req: NextRequest) {
    try {
        const data: responseData = await req.json();
        const { paragraph, adjectives } = data;

        var prompt = `You are an Animal Adjective Categorizing Bot where you are given a paragraph and a list of adjectives now you have to analyse the condition a person is in from the paragraph and then tell what type of dog should he be accompanied with by describing in adjectives form the given list\n\n{\nparagraph: \`${paragraph},\`\nadjectives: ${JSON.stringify(adjectives)}\n}\n\nnow based on the paragraph and the list of adjectives\ngive the output as a list of adjectives that will be suitable for the dog which will accompany him mind it that give the response only in a list format and nothing extra should be there`;

        const result = await model.generateContent(prompt);
        const response  = result.response.text()

        return NextResponse.json({qualities:JSON.parse(response.trim())});
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
