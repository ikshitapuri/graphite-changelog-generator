import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { Changelog, ChangelogEntry, ChangelogEntryPointCategory } from '@/types'

// Add entry and save the changelog to the data directory in JSON format
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { date, summary, points, title } = req.body

    if (!date || !summary || !points || !title) {
        return res
            .status(400)
            .json({ message: 'Date, summary, points, and title are required' })
    }

    try {
        // Create the data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        const filePath = path.join(dataDir, 'changelog.json')

        // Read existing changelog or create new one
        let changelog: Changelog = { id: crypto.randomUUID(), entries: [] }
        if (fs.existsSync(filePath)) {
            const existingData = fs.readFileSync(filePath, 'utf-8')
            changelog = JSON.parse(existingData)
        }

        // New entry
        const newEntry: ChangelogEntry = {
            id: crypto.randomUUID(),
            date: new Date(date),
            title,
            summary,
            points: points.map((point: { category: string; text: string }) => ({
                id: crypto.randomUUID(),
                text: point.text,
                category: point.category as ChangelogEntryPointCategory,
            })),
        }

        changelog.entries.unshift(newEntry)

        // Write to file
        fs.writeFileSync(filePath, JSON.stringify(changelog, null, 2))

        res.status(200).json({
            message: 'Changelog saved',
            filePath: filePath,
        })
    } catch (error) {
        console.error('Error saving changelog:', error)
        res.status(500).json({
            message: 'Failed to save changelog',
            error: error instanceof Error ? error.message : 'Unknown error',
        })
    }
}
