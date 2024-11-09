import {Item} from "@/types";
import Link from "next/link";
import React from "react";
import NextImage from "next/image";

interface HeroSectionProps {
    items: Item[]
}

export default function SearchSection({items}: HeroSectionProps) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {items.map((item) => (
                        <Link href={`/phim/${item.slug}`} key={item.slug} className="group">
                            <div
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
                                <div className="relative aspect-[2/3]">
                                    <NextImage
                                        src={item.thumb_url}
                                        alt={item.name}
                                        fill={true}
                                        objectFit="cover"
                                        className="transition-opacity duration-300 group-hover:opacity-75"
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                        <h2 className="text-white text-lg font-semibold line-clamp-2">{item.name}</h2>
                                        <p className="text-gray-300 text-sm">{item.original_name}</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Tập: {item.current_episode} / {item.total_episodes}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Chất lượng: {item.quality} | Ngôn ngữ: {item.language}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}