'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'
import {EmblaOptionsType} from "embla-carousel";
import {Button} from "@nextui-org/button";
import {AnchorIcon} from "@nextui-org/shared-icons";

interface ParallaxCarouselProps {
    slides: {
        id: number
        imageUrl: string
        title: string
    }[]
    options?: EmblaOptionsType
}

const PARALLAX_FACTOR = 1.2

export default function ParallaxCarousel({ slides, options = {} }: ParallaxCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [parallaxValues, setParallaxValues] = useState<number[]>([])

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    useEffect(() => {
        if (!emblaApi) return

        const updateParallaxValues = () => {
            const engine = emblaApi.internalEngine()
            const scrollProgress = emblaApi.scrollProgress()

            const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
                if (!emblaApi.slidesInView().includes(index)) return 0
                let diffToTarget = scrollSnap - scrollProgress

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target()
                        if (index === loopItem.index && target !== 0) {
                            const sign = Math.sign(target)
                            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
                        }
                    })
                }

                return diffToTarget * (-1 / PARALLAX_FACTOR) * 100
            })

            setParallaxValues(styles)
        }

        emblaApi.on('scroll', updateParallaxValues)
        updateParallaxValues()

        return () => {
            emblaApi.off('scroll', updateParallaxValues)
        }
    }, [emblaApi])

    return (
        <div className="relative h-full w-full   overflow-hidden">
            123
            <div className="absolute z-10 flex justify-between w-full top-1/2">
                <Button
                    className="ml-4 bg-background/80"
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                >
                    <AnchorIcon className="h-4 w-4" />
                </Button>
                <Button
                    className="mr-4 bg-background/80"
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                >
                    <AnchorIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {slides.map((slide, index) => (
                        <div className="relative flex-[0_0_100%] min-w-0" key={slide.id}>
                            <div
                                className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slide.imageUrl})`,
                                    transform: `translateX(${parallaxValues[index]}%)`,
                                    width: '100%', // Set the width of the image
                                    height: '100%', // Set the height of the image
                                }}
                            />
                            <div
                                className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                                <h2 className="text-white text-2xl font-bold">{slide.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}