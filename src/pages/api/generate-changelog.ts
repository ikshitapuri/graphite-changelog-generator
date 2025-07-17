import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Generate a changelog from a list of commit messages
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({
            message:
                'OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.',
        })
    }

    const { commits } = req.body

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content:
                'You are an expert technical writer and changelog editor. You help convert raw commit messages into a polished, user-facing changelog. The changelog should be clear, concise, and highlight only the most important updates for end users.',
        },
        {
            role: 'user',
            content: `Here is a list of commit messages: ${commits}
      
      Instructions:
        - First, write a short, one-paragraph (around 2-3 sentences) summary explaining overall what changed in simple, friendly language.
        - Then, provide up to 5 bullet points summarizing the most important and user-relevant changes. Keep it short and concise.
        - Label each bullet point with a category ("Feature", "Fix", "Refactor"). If you are not sure, use "Refactor".
        - Ignore test changes, dependency bumps, or purely technical maintenance.
        - Use present tense and active voice.
        - Do not include raw commit messages or extra commentary.
        - Also include a title for the changelog entry. The title should be a short, descriptive title for the changelog entry.
        - The title should be a single sentence.
        
        Output a valid JSON object with this shape:

        {
            "title": "Your title here.",
            "summary": "Your summary text here.",
            "points": [
                { "category": "fix", "text": "Description here." },
                { "category": "feature", "text": "Description here." }
            ]
        }

         - Output only the final JSON object — no preamble or extra text.
        
        `,
        },
    ]

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
        })

        const response = completion.choices[0].message.content
        if (!response) {
            res.status(500).json({ message: 'No response from OpenAI' })
            return
        }

        // Remove markdown code blocks and newlines
        let cleanedResponse = response.trim()
        cleanedResponse = cleanedResponse
            .replace(/^```json\n/, '')
            .replace(/\n```$/, '')
            .replace(/^```\n/, '')

        try {
            const parsedData = JSON.parse(cleanedResponse)
            res.status(200).json({
                message: 'Changelog generated',
                data: parsedData,
            })
        } catch (parseError) {
            console.error('Failed to parse response:', parseError)
            res.status(500).json({
                message: 'Failed to parse response',
                response: response,
            })
        }
    } catch (error) {
        const apiError = error as { code?: string; message?: string }
        console.error('OpenAI API Error:', error)

        if (apiError.code === 'insufficient_quota') {
            res.status(402).json({
                message:
                    'OpenAI API quota exceeded. Please check your account or try again later.',
                error: 'insufficient_quota',
            })
        } else if (apiError.code === 'invalid_api_key') {
            res.status(401).json({
                message:
                    'Invalid OpenAI API key. Please check your configuration.',
                error: 'invalid_api_key',
            })
        } else {
            res.status(500).json({
                message: 'Error generating changelog. Please try again.',
                error: apiError.message || 'unknown_error',
            })
        }
    }
}
