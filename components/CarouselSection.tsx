import React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Image} from "@nextui-org/image";
import {Item} from "@/types";
import {Card, CardFooter} from "@nextui-org/card";
import {useRouter} from "next/navigation";
import Autoplay from "embla-carousel-autoplay"


export default function CarouselSection() {
    const router = useRouter()
    //fetch data from api
    const [items, setItems] = React.useState<Item[]>([])
    React.useEffect(() => {
        fetch("/api/phim-moi-cap-nhat")
            .then((res) => res.json())
            .then((data) => {
                setItems(data.items)
            })
    }, [])

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            title={"Phim mới cập nhật"}
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
        >
            <CarouselContent>
                {items.map((item) => (
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 my-4" key={item.slug}>


                        <Card
                            isPressable={true}
                            key={item.slug}
                            isFooterBlurred
                            radius="lg"
                            onPress={() => {
                                router.push(`/phim/${item.slug}`)
                            }}
                        >
                            <Image
                                className={""}
                                isBlurred={true}
                                src={`//wsrv.nl/?url=${item.poster_url}&w=400&h=200&output=webp`}
                                alt={item.name} width={400} height={200}/>
                            <CardFooter
                                className="flex items-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 bg-black/70">                                <strong
                                className="w-full text-xs text-center text-white  p-1 rounded">{item.name}</strong>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    )
}