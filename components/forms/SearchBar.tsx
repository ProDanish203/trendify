"use client"

interface Props{
    search: string;
    setSearch: (text:string) => void
}

export const SearchBar = ({ search, setSearch}: Props) => {
  return (
    <div
    className="relative max-w-[700px] w-full mx-auto px-3"
    >
    <input type="text" 
    placeholder="search with tags or prompts"
    className="py-3 px-4 outline-none bg-gray-300 text-text w-full rounded"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    />
    </div>
  )
}
