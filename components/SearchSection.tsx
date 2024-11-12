"use client"

import {Item} from "@/types";
import React from "react";
import {Image} from "@nextui-org/image";
import {Card, CardFooter} from "@nextui-org/card";
import {useRouter} from "next/navigation";

interface HeroSectionProps {
    items: Item[]
}

export default function SearchSection({items}: HeroSectionProps) {
    const router = useRouter()
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {items.map((item) => (
                        <Card
                            isPressable
                            key={item.slug}
                            isFooterBlurred
                            radius="lg"
                            className="border-none h-[500px] w-[333px] sm:h-[400px] sm:w-[267px] md:h-[350px] md:w-[233px] lg:h-[300px] lg:w-[200px]"
                            onPress={() => {
                                router.push(`/phim/${item.slug}`)
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    removeWrapper={true}
                                    isZoomed={true}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    src={`//wsrv.nl/?url=${item.thumb_url}&w=200&h=300&output=webp`}
                                    fallbackSrc={"/loading.webp"}
                                />
                            </div>
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 w-full">
                                <div className="flex flex-grow gap-2 items-center w-full">
                                    <div className="flex flex-col items-center w-full">
                                        <p className="text-center text-xs font-bold text-white">{item.name}</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}