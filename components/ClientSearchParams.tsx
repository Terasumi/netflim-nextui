'use client'

import {useSearchParams} from 'next/navigation'

export default function ClientSearchParamsHandler({children}: { children: (page: number) => React.ReactNode }) {
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    return <>{children(currentPage)}</>
}