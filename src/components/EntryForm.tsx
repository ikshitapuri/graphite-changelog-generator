import { useState } from 'react'

type GeneratedChangelog = {
    summary: string
    points: {
        category: string
        text: string
    }[]
}

export default function EntryForm() {
    const [commitMessages, setCommitMessages] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [generatedChangelog, setGeneratedChangelog] =
        useState<GeneratedChangelog>({ summary: '', points: [] })
    const [isPublishing, setIsPublishing] = useState<boolean>(false)

    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0]

    const handleGenerateChangelog = async () => {
        if (!commitMessages.trim()) {
            alert('Please enter some commit messages')
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/generate-changelog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commits: commitMessages }),
            })

            const parsedResponse = await response.json()

            if (!response.ok) {
                if (response.status === 402) {
                    alert(
                        'OpenAI API quota exceeded. Please check your account or try again later.'
                    )
                } else if (response.status === 401) {
                    alert(
                        'Invalid OpenAI API key. Please check your configuration.'
                    )
                } else {
                    alert(
                        parsedResponse.message ||
                            'Failed to generate changelog. Please try again.'
                    )
                }
                return
            }

            // Handle the new response format with summary and points
            if (parsedResponse.data.summary && parsedResponse.data.points) {
                setGeneratedChangelog({
                    summary: parsedResponse.data.summary,
                    points: parsedResponse.data.points,
                })
            } else {
                setGeneratedChangelog({ summary: '', points: [] })
            }
        } catch (error) {
            console.error('Error generating changelog:', error)
            alert('Failed to generate changelog. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handlePublish = async () => {
        if (
            !generatedChangelog.summary ||
            generatedChangelog.points.length === 0
        ) {
            alert('Please generate a changelog first')
            return
        }

        setIsPublishing(true)
        try {
            // Extract the date from the form
            const dateInput = document.getElementById(
                'date'
            ) as HTMLInputElement
            const selectedDate = dateInput?.value || currentDate

            const response = await fetch('/api/save-changelog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: selectedDate,
                    summary: generatedChangelog.summary,
                    points: generatedChangelog.points,
                    title: 'New Changelog Entry',
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save changelog')
            }

            alert('Changelog saved successfully!')

            // Clear the form
            setCommitMessages('')
            setGeneratedChangelog({ summary: '', points: [] })
        } catch (error) {
            console.error('Error saving changelog:', error)
            alert('Failed to save changelog. Please try again.')
        } finally {
            setIsPublishing(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">New Changelog Entry</h2>

            <div className="space-y-4">
                {/* Date */}
                <div>
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-500 mb-1"
                    >
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        defaultValue={currentDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Commit Messages */}
                <div>
                    <label
                        htmlFor="commitMessages"
                        className="block text-sm font-medium text-gray-500 mb-1"
                    >
                        Commit Messages:
                    </label>
                    <textarea
                        id="commitMessages"
                        value={commitMessages}
                        onChange={(e) => setCommitMessages(e.target.value)}
                        placeholder="Enter your commit messages here..."
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                </div>

                {/* Generate Button */}
                <button
                    type="button"
                    onClick={handleGenerateChangelog}
                    disabled={isLoading}
                    className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generating...' : 'Generate Changelog'}
                </button>
            </div>

            {/* Generated Summary */}
            {generatedChangelog.summary &&
                generatedChangelog.points.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <div className="mt-6 p-4 bg-gray-50 rounded-md border">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Generated Changelog:
                            </h3>
                            <div className="text-sm text-gray-600 whitespace-pre-wrap">
                                {`${
                                    generatedChangelog.summary
                                }\n\n${generatedChangelog.points
                                    .map(
                                        (point: {
                                            category: string
                                            text: string
                                        }) => `• ${point.text}`
                                    )
                                    .join('\n')}`}
                            </div>
                        </div>

                        {/* Publish Button */}
                        <button
                            type="button"
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPublishing ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                )}
        </div>
    )
}
