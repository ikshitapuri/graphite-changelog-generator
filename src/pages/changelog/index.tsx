import ChangelogEntry from '@/components/ChangelogEntry'
import { useEffect, useState } from 'react'
import { Changelog as ChangelogType } from '@/types'
import { serializeChangelog } from '@/utils/serializer'

const Changelog = () => {
    const [changelog, setChangelog] = useState<ChangelogType>()

    useEffect(() => {
        const fetchChangelog = async () => {
            try {
                const response = await fetch('/api/get-changelog')
                const parsedResponse = await response.json()
                if (parsedResponse.data) {
                    const changelog = serializeChangelog(parsedResponse.data)
                    setChangelog(changelog)
                }
            } catch (error) {
                console.error('Error fetching changelog:', error)
            }
        }
        fetchChangelog()
    }, [])

    if (!changelog) {
        return (
            <div className="flex justify-center items-center h-screen">
                No changelog found
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center p-4 max-w-2xl mx-auto py-10 gap-20">
            <h1 className="text-2xl font-extrabold self-start">Changelog</h1>
            {changelog.entries.length > 0 ? (
                <div className="flex flex-col gap-22">
                    {changelog?.entries.map((entry) => (
                        <ChangelogEntry key={entry.id} entry={entry} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    No changelog entries found
                </div>
            )}
        </div>
    )
}

export default Changelog
