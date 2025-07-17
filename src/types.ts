/* Represents the entire changelog */
export type Changelog = {
    id: string
    entries: ChangelogEntry[]
}

/* Represents a single entry in the changelog */
export type ChangelogEntry = {
    id: string
    date: Date
    title: string
    summary: string[]
    points: ChangelogEntryPoint[]
}

/* Represents a single bullet point in a changelog entry */
export type ChangelogEntryPoint = {
    id: string
    text: string
    category: ChangelogEntryPointCategory
}

/* Represents the category of a bullet point */
export enum ChangelogEntryPointCategory {
    FIX = 'fix',
    FEATURE = 'feature',
    REFACTOR = 'refactor',
}
