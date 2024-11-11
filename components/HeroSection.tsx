import {Item} from "@/types";
import React from "react";
import {Card, CardFooter, CardBody} from "@nextui-org/card";
import NextImage from "next/image";
import {useRouter} from "next/navigation";


interface HeroSectionProps {
    currentPage: number
    apiLink: string
}

export default function HeroSection({currentPage, apiLink}: HeroSectionProps) {
    const router = useRouter()

    //fetch data from api
    console.log("Current Api Link: ", apiLink)
    const [items, setItems] = React.useState<Item[]>([])
    console.log(`${process.env.NEXT_PUBLIC_VIDEO_SOURCE}/${apiLink}?page=${currentPage}`)
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
                            isPressable={true}
                            key={item.slug}
                            isFooterBlurred
                            radius="lg"
                            className="border-none h-[500px] w-[333px] sm:h-[400px] sm:w-[267px] md:h-[350px] md:w-[233px] lg:h-[300px] lg:w-[200px]"
                            onPress={() => {
                                router.push(`/phim/${item.slug}`)
                            }}
                        >
                            <NextImage
                                alt="Woman listing to music"
                                className="object-cover"
                                src={item.thumb_url}
                                fill={true}
                            />
                            <CardFooter
                                className="flex items-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <strong className="text-xs text-center text-white/80">{item.name}.</strong>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}