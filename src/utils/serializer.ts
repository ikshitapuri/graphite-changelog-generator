import {
    Changelog,
    ChangelogEntry,
    ChangelogEntryPoint,
    ChangelogEntryPointCategory,
} from '@/types'

// Serialize API response to Changelog
export function serializeChangelog(apiResponse: unknown): Changelog {
    if (
        !apiResponse ||
        typeof apiResponse !== 'object' ||
        !('entries' in apiResponse)
    ) {
        return { id: '', entries: [] } as Changelog
    }

    const response = apiResponse as { id?: string; entries?: unknown[] }

    if (!response.id) {
        return { id: '', entries: [] } as Changelog
    }

    return {
        id: response.id,
        entries:
            response.entries
                ?.map((entry) => serializeChangelogEntry(entry))
                .sort((a, b) => b.date.getTime() - a.date.getTime()) || [],
    }
}

// Serialize changelog entry
export function serializeChangelogEntry(entry: unknown): ChangelogEntry {
    const entryData = entry as {
        id: string
        date: string
        title: string
        summary: unknown
        points: unknown[]
    }

    return {
        id: entryData.id,
        date: new Date(entryData.date),
        title: entryData.title,
        summary: Array.isArray(entryData.summary)
            ? entryData.summary
            : [String(entryData.summary || '')],
        points: (entryData.points || []).map((point) =>
            serializeChangelogPoint(point)
        ),
    }
}

// Serialize changelog point
export function serializeChangelogPoint(point: unknown): ChangelogEntryPoint {
    const pointData = point as { id: string; text: string; category: string }
    return {
        id: pointData.id,
        text: pointData.text,
        category: mapCategoryToEnum(pointData.category),
    }
}

// Map string category to point category enum
export function mapCategoryToEnum(
    category: string
): ChangelogEntryPointCategory {
    const lowerCategory = category.toLowerCase()

    switch (lowerCategory) {
        case 'fix':
            return ChangelogEntryPointCategory.FIX
        case 'feature':
            return ChangelogEntryPointCategory.FEATURE
        case 'refactor':
            return ChangelogEntryPointCategory.REFACTOR
        default:
            // Default to REFACTOR for unknown categories
            return ChangelogEntryPointCategory.REFACTOR
    }
}
