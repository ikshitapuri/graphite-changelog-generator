import { ChangelogEntryPointCategory } from '@/types'
import { useCallback } from 'react'

const Tag = ({ category }: { category: ChangelogEntryPointCategory }) => {
    const getTextAndBgColor = useCallback(
        (category: ChangelogEntryPointCategory) => {
            if (category === ChangelogEntryPointCategory.FEATURE) {
                return 'bg-green-500/20 text-green-500'
            } else if (category === ChangelogEntryPointCategory.FIX) {
                return 'bg-blue-500/20 text-blue-500'
            } else if (category === ChangelogEntryPointCategory.REFACTOR) {
                return 'bg-yellow-500/20 text-yellow-500'
            }

            return 'bg-gray-500/20 text-gray-500'
        },
        []
    )

    return (
        <div
            className={`${getTextAndBgColor(
                category
            )} px-1 py-1 rounded-md flex items-center gap-1`}
        >
            <p className="text-xs uppercase font-semibold">{category}</p>
        </div>
    )
}

export default Tag
