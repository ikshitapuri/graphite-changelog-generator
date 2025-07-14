import { ChangelogEntry as ChangelogEntryType } from "../types";
import Tag from "./tag";

const ChangelogEntry = ({ entry }: { entry: ChangelogEntryType }) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold items-center flex gap-2">{entry.title}</h2>
                <span className="text-sm text-gray-500">{entry.date}</span>
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Overview</h2>
                <p>{entry.summary}</p>
            </div>

            {/* Changes */}
            <ul className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Changes</h2>
                {entry.points.map((point) => (
                    <li key={point.id} className="flex gap-2 items-center">
                        <div className="w-2 h-2 bg-black rounded-full">{/* Bullet point */}</div>
                        <Tag category={point.category} />
                        <p>{point.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChangelogEntry;