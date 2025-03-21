import { LoaderIcon } from "lucide-react";

export const LoaderUI = () => {
    return (
        <div className="h-[calc(100vh-4rem-1px)] flex items-center justify-center">
            <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
        </div>
    )
}