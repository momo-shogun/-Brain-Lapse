const tagClass = "inline-flex items-center bg-purple-200 text-violet-600 hover:bg-purple-200/80 duration-100 delay-75	rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent"


export default function Tags({ tags }: { tags?: string[] }) {


    if (!tags || tags.length === 0) {
        return null
    }

    return (
        <>
            {tags.map((tag, index) =>
                <div key={index} className={tagClass} >
                    {tag}
                </div>
            )}
        </>
    )

}

