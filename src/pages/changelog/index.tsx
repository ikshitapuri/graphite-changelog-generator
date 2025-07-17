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
        <div className="flex flex-col items-center p-4 max-w-3xl mx-auto py-10 gap-20">
            <h1 className="text-2xl font-extrabold self-start">Changelog</h1>
            {changelog.entries.length > 0 ? (
                <div className="flex relative w-full">
                    {/* Vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                    <div className="flex flex-col gap-22 w-full">
                        {changelog?.entries.map((entry) => (
                            <div key={entry.id} className="relative">
                                {/* Dot */}
                                <div className="absolute left-[-5px] top-2.5 w-3 h-3 bg-gray-500 rounded-full border-4 border-gray-500 shadow-md z-10"></div>
                                <div className="ml-10">
                                    <ChangelogEntry entry={entry} />
                                </div>
                            </div>
                        ))}
                    </div>
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
