import { Changelog, ChangelogEntry, ChangelogEntryPointCategory } from './types'

// Dummy changelog entries for testing
const changelogEntries: ChangelogEntry[] = [
    {
        id: 'july-13-2025',
        date: new Date('July 13, 2025'),
        title: 'Version 1.0.0',
        summary: [
            'Added support for refresh tokens in authentication. Introduced a new `GET /user/settings` API endpoint. Fixed an issue with mobile layout on the profile page. Improved error handling for webhook retries.',
        ],
        points: [
            {
                id: 'july-13-2025-1',
                text: 'Added support for refresh tokens in authentication.',
                category: ChangelogEntryPointCategory.FEATURE,
            },
            {
                id: 'july-13-2025-2',
                text: 'Introduced a new `GET /user/settings` API endpoint.',
                category: ChangelogEntryPointCategory.FEATURE,
            },
        ],
    },
    {
        id: 'july-5-2025',
        date: new Date('July 5, 2025'),
        title: 'Version 0.1.0',
        summary: [
            'Deprecated legacy API endpoints — sunset scheduled for September 1, 2025. Improved documentation for custom domain setup. Fixed rare crash when exporting CSV files.',
        ],
        points: [
            {
                id: 'july-5-2025-1',
                text: 'Deprecated legacy API endpoints.',
                category: ChangelogEntryPointCategory.REFACTOR,
            },
            {
                id: 'july-5-2025-2',
                text: 'Improved documentation for custom domain setup.',
                category: ChangelogEntryPointCategory.REFACTOR,
            },
            {
                id: 'july-5-2025-3',
                text: 'Fixed rare crash when exporting CSV files.',
                category: ChangelogEntryPointCategory.FIX,
            },
        ],
    },
]

export const dummyChangelog: Changelog = {
    id: 'changelog',
    entries: changelogEntries,
}
