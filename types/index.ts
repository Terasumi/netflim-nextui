import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Paginate {
  current_page: number;
  total_page: number;
  total_items: number;
  items_per_page: number;
}

export interface Item {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
}

export interface ResponseFlimType {
  status: string;
  paginate: Paginate;
  items: Item[];
}

export interface MovieCategory {
  [key: string]: {
    group: {
      id: string;
      name: string;
    };
    list: {
      id: string;
      name: string;
    }[];
  };
}

export interface EpisodeItem {
  name: string;
  slug: string;
  embed: string;
  m3u8: string;
}

export interface Episode {
  server_name: string;
  items: EpisodeItem[];
}

export interface Movie {
  id: string;
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
  category: MovieCategory;
  episodes: Episode[];
}

export interface MovieResponse {
  status: string;
  movie: Movie;
}

export interface SearchFlimResponse {
  status: string;
  paginate: Paginate;
  items: Item[];
}