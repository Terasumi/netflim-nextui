// /api/edit-san-pham/route.ts

import {NextResponse} from "next/server";

export const revalidate = 3600 * 24; // revalidate this data every hour

export async function GET(
    request: Request,
    {params}: { params: { slug: string } },
) {
    try {
        //get page query
        const url = new URL(request.url);
        const page = url.searchParams.get("page") || "1";
        const res = await fetch(`${process.env.NEXT_PUBLIC_VIDEO_SOURCE}/api/films/danh-sach/${params.slug}?page=${page}`, {
            next: {revalidate: 3600 * 24}
        });
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to update san-pham", error);
    }
}