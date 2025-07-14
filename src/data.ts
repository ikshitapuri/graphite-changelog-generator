import { Changelog, ChangelogEntry, ChangelogEntryPointCategory } from "./types";

const changelogEntries: ChangelogEntry[] = [
  {
    id: "july-13-2025",
    date: "July 13, 2025",
    title: "Version 1.0.0",
    summary: [
      "Added support for refresh tokens in authentication. Introduced a new `GET /user/settings` API endpoint. Fixed an issue with mobile layout on the profile page. Improved error handling for webhook retries.",
    ],
    points: [
      {
        id: "july-13-2025-1",
        title: "Added support for refresh tokens in authentication.",
        category: ChangelogEntryPointCategory.FEATURE,
      },
      {
        id: "july-13-2025-2",
        title: "Introduced a new `GET /user/settings` API endpoint.",
        category: ChangelogEntryPointCategory.FEATURE,
      },
      
    ],
  },
  {
    id: "july-5-2025",
    date: "July 5, 2025",
    title: "Version 0.1.0",
    summary: [
      "Deprecated legacy API endpoints — sunset scheduled for September 1, 2025. Improved documentation for custom domain setup. Fixed rare crash when exporting CSV files.",
    ],
    points: [
      {
        id: "july-5-2025-1",
        title: "Deprecated legacy API endpoints.",
        category: ChangelogEntryPointCategory.REFACTOR,
      },
      {
        id: "july-5-2025-2",
        title: "Improved documentation for custom domain setup.",
        category: ChangelogEntryPointCategory.REFACTOR,
      },
      {
        id: "july-5-2025-3",
        title: "Fixed rare crash when exporting CSV files.",
        category: ChangelogEntryPointCategory.FIX,
      },
    ],
  },
];

export const dummyChangelog: Changelog = {
    id: "changelog",
    title: "Alphabet Changelog",
    entries: changelogEntries,
  };
