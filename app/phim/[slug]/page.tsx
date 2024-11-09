import {MovieResponse, ResponseFlimType} from "@/types";
import MovieSection from "@/components/MovieSection";

async function getData(slug: string) {
    let page = 1
    const res = await fetch(`${process.env.VIDEO_SOURCE}/api/film/${slug}`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function PhimPage({ params }: { params: { slug: string } }) {
    //fet data from api: GET https://phim.nguonc.com/api/film/${slug}
    const data:MovieResponse = await getData(params.slug)
    console.log(data)

    return <MovieSection movieData={data}/>
}