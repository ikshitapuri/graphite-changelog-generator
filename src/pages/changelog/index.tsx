import ChangelogEntry from "@/components/ChangelogEntry";
import { dummyChangelog } from "../../data";

const Changelog = () => {
    const changelog = dummyChangelog;

    return (
        <div className="flex flex-col items-center p-4 max-w-2xl mx-auto py-10 gap-20">
            <h1 className="text-2xl font-extrabold self-start">{changelog.title}</h1>
            <div className="flex flex-col gap-22">
                {changelog.entries.map((entry) => (
                    <ChangelogEntry key={entry.id} entry={entry} />
                ))}
            </div>
        </div>
    )
};

export default Changelog;