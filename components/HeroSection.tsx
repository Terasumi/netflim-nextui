import {Item} from "@/types";
import React from "react";
import {Card, CardFooter, CardBody} from "@nextui-org/card";
import {useRouter} from "next/navigation";
import {Image} from "@nextui-org/image";
import {Skeleton} from "@nextui-org/skeleton";


interface HeroSectionProps {
    currentPage: number
    apiLink: string
}

export default function HeroSection({currentPage, apiLink}: HeroSectionProps) {
    const router = useRouter()

    //fetch data from api
    console.log("Current Api Link: ", apiLink)
    const [items, setItems] = React.useState<Item[]>([])
    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_VIDEO_SOURCE}/${apiLink}?page=${currentPage}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.items)
            })
    }, [currentPage, apiLink])


    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
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