'use client'

import {useRef, useState} from 'react'
import Image from 'next/image'
import {MovieResponse} from "@/types";
import {Tab, Tabs} from "@nextui-org/tabs";
import { RadioGroup} from "@nextui-org/radio";
import {cn} from '@nextui-org/react';
import SizeRadioItem from "@/components/CustomRadio";

interface MoviePageProps {
    movieData: MovieResponse
}

export default function MovieSection({movieData}: MoviePageProps) {
    const {movie} = movieData
    const [selectedEpisode, setSelectedEpisode] = useState<string>()
    const videoSectionRef = useRef(null)

    const handleEpisodeChange = (value: string) => {
        setSelectedEpisode(value)

        // Scroll to the video section
        if (videoSectionRef.current) {
            setTimeout(() => {
                // @ts-ignore
                videoSectionRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
            }, 100) // Small delay to ensure the video has rendered
        }
    }


    const renderCategories = () => {
        return Object.entries(movie.category).map(([key, value]) => (
            <div key={key} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{value.group.name}</h3>
                <div className="flex flex-wrap gap-2">
                    {value.list.map((item) => (
                        <span key={item.id} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm">
              {item.name}
            </span>
                    ))}
                </div>
            </div>
        ))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Image
                        src={movie.poster_url}
                        alt={movie.name}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
                    <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">{movie.original_name}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p><strong>Đạo diễn:</strong> {movie.director}</p>
                            <p><strong>Diễn viên:</strong> {movie.casts}</p>
                            <p><strong>Ngôn ngữ:</strong> {movie.language}</p>
                        </div>
                        <div>
                            <p><strong>Chất lượng:</strong> {movie.quality}</p>
                            <p><strong>Thời lượng:</strong> {movie.time}</p>
                            <p><strong>Số tập:</strong> {movie.current_episode} / {movie.total_episodes}</p>
                        </div>
                    </div>
                    <p className="mb-6">{movie.description}</p>
                    {renderCategories()}
                </div>
            </div>


            <div className="flex w-full flex-col">
                <Tabs aria-label="Episode">
                    {movie.episodes.map((episode) => (
                        <Tab key={episode.server_name} title={episode.server_name}>
                            <RadioGroup
                                classNames={{
                                    base: cn("", "max-w-fit"),
                                    wrapper: cn("", "gap-3"),
                                }}
                                defaultValue="1"
                                orientation="horizontal"
                                size="lg"
                                value={selectedEpisode}
                                onValueChange={handleEpisodeChange}
                            >
                                {episode.items.map((item, index) => (
                                    <SizeRadioItem key={item.slug} value={item.embed} label={item.name}/>
                                ))}
                            </RadioGroup>
                        </Tab>
                    ))}
                </Tabs>
            </div>

            <div ref={videoSectionRef} className="mt-8">

                {selectedEpisode && (
                    <div className="mt-8">
                        <div className="aspect-video">
                            <iframe
                                src={selectedEpisode}
                                allowFullScreen

                                className="w-full h-full rounded-lg"
                                title={`Xem ${movie.name}}`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}