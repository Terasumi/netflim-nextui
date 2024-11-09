"use client"

import {Suspense, useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import HeroSection from "@/components/HeroSection"
import {ResponseFlimType} from "@/types"
import {Spacer} from "@nextui-org/spacer"
import {Pagination} from "@nextui-org/pagination"

async function getData(page: number): Promise<ResponseFlimType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VIDEO_SOURCE}/api/films/phim-moi-cap-nhat?page=${page}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

function PageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const [data, setData] = useState<ResponseFlimType | null>(null)

    useEffect(() => {
        getData(currentPage)
            .then(setData)
            .catch(error => console.error('Error fetching data:', error))
    }, [currentPage])

    const handlePageChange = (page: number) => {
        const query = page === 1 ? '' : `?page=${page}`
        router.push(`${window.location.pathname}${query}`)
    }

    if (!data) return <div>Loading...</div>

    return (
        <div>
            <HeroSection items={data.items}/>

            <Spacer y={4}/>
            <Pagination
                page={currentPage}
                total={data.paginate.total_page}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent/>
        </Suspense>
    )
}