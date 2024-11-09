import HeroSection from "@/components/HeroSection";
import {ResponseFlimType} from "@/types";

async function getData() {
    let page = 1
    const res = await fetch(`${process.env.VIDEO_SOURCE}/api/films/phim-moi-cap-nhat?page=${page}`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Page() {
    const data: ResponseFlimType = await getData()
    console.log(data)

    return (
        <div>
            <HeroSection items={data.items}/>
        </div>
    )
}