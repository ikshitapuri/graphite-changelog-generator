import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { serializeChangelog } from '@/utils/serializer'

// Get all changelog entries from the data directory in JSON format
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const filePath = path.join(process.cwd(), 'data', 'changelog.json')

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(200).json({
                entries: [],
                message: 'No changelog entries found',
            })
        }

        // Read the file
        const content = fs.readFileSync(filePath, 'utf-8')
        const parsedContent = JSON.parse(content)

        // Serialize the data before returning to ensure proper type mapping
        const serializedChangelog = serializeChangelog(parsedContent)

        res.status(200).json({
            message: 'Changelog entries fetched',
            data: serializedChangelog,
        })
    } catch (error) {
        console.error('Error reading changelog:', error)
        res.status(500).json({
            message: 'Failed to read changelog',
            error: error instanceof Error ? error.message : 'Unknown error',
        })
    }
}
