'use client'

import {useState} from 'react'
import Image from 'next/image'
import {EpisodeItem, MovieResponse} from "@/types";

interface MoviePageProps {
    movieData: MovieResponse
}

export default function MovieSection({movieData}: MoviePageProps) {
    const {movie} = movieData
    const [selectedEpisode, setSelectedEpisode] = useState<EpisodeItem | null>(null)

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

    const renderEpisodes = () => {
        return movie.episodes.map((episode) => (
            <div key={episode.server_name} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{episode.server_name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {episode.items.map((item) => (
                        <button
                            key={item.slug}
                            onClick={() => setSelectedEpisode(item)}
                            className={`p-2 text-sm rounded ${
                                selectedEpisode?.slug === item.slug
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary hover:bg-secondary/80'
                            }`}
                        >
                            {item.name}
                        </button>
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

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Các tập phim</h2>
                {renderEpisodes()}
            </div>

            {selectedEpisode && (
                <div className="mt-8">
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Bấm để xem tập {selectedEpisode.name}</h2>
                        <div className="aspect-video">
                            <iframe
                                key={selectedEpisode.slug}
                                src={selectedEpisode.embed}
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                                title={`Watch ${selectedEpisode.name}`}
                            />
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}