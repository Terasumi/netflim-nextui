import {NextResponse} from 'next/server';

export const revalidate = 3600*24; // revalidate this data every hour

export async function GET() {
    console.log("GET /api/films/phim-moi-cap-nhat");

    const res = await fetch(`${process.env.NEXT_PUBLIC_VIDEO_SOURCE}/api/films/phim-moi-cap-nhat?page=1`, {
        next: {revalidate: 3600*24}
    });
    const data = await res.json();

    return NextResponse.json(data);
}