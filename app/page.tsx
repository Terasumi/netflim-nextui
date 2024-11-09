"use client"

import {Suspense} from 'react'
import {useSearchParams} from 'next/navigation'
import HeroSection from "@/components/HeroSection"
import {ResponseFlimType} from "@/types"
import {Spacer} from "@nextui-org/spacer"
import {Pagination} from "@nextui-org/pagination"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown"
import {Button} from "@nextui-org/button"

async function getData(page: number): Promise<ResponseFlimType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VIDEO_SOURCE}/api/films/phim-moi-cap-nhat?page=${page}`, {
        next: {revalidate: 60 * 60}, // Revalidate every 1 hour
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

async function PageContent({page}: { page: number }) {
    const data = await getData(page)

    return (
        <div>
            <HeroSection items={data.items}/>
            <Spacer y={4}/>
            <Pagination
                page={page}
                total={data.paginate.total_page}
                onChange={(newPage) => {
                    const query = newPage === 1 ? '' : `?page=${newPage}`
                    window.history.pushState(null, '', `${window.location.pathname}${query}`)
                }}
            />
        </div>
    )
}

function FilterSection() {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-3">
                {['Thể loại', 'Quốc gia', 'Năm'].map((label) => (
                    <Dropdown key={label}>
                        <DropdownTrigger>
                            <Button variant="flat" size={"lg"}>
                                {label}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label={`${label} options`}>
                            <DropdownItem key="placeholder">Đang hoàn thiện chức năng</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ))}
            </div>
        </div>
    )
}

export default function Page() {
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    return (
        <div className="flex flex-col gap-4">
            <FilterSection/>
            <Suspense fallback={<div>Loading...</div>}>
                <PageContent page={currentPage}/>
            </Suspense>
        </div>
    )
}