import {ResponseFlimType, SearchFlimResponse} from "@/types"

import SearchSection from "@/components/SearchSection";

async function getData(
    keywork: string,
): Promise<ResponseFlimType> {
    const res = await fetch(`${process.env.VIDEO_SOURCE}/api/films/search?keyword=${keywork}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function SearchPage({params}: { params: { keywork: string } }) {
    const {keywork} = params

    const data: SearchFlimResponse = await getData(keywork)
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: {keywork}</h1>
            <SearchSection items={data.items}/>
        </div>
    )
}