// Please install OpenAI SDK first: npm install openai
import OpenAI from 'openai';
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
    defaultHeaders: {
    },
  });

async function main() {
    const completion = await openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
            {
                role: "system",
                content: ` You are an AI agent that and you will get queries regarding space objects like
                  -planets
                  -black holes
                  and also you will get asked about space missions and all other questions about universe `
            },
            {
                role: "user",
                content: 
            }
        ],
    });

    console.log(completion.choices[0].message.content);
}

main();