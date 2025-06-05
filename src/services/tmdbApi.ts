
const TMDB_API_KEY = 'your_tmdb_api_key_here'; // You'll need to get this from https://www.themoviedb.org/settings/api
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface TMDBResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
}

export const searchMoviesAndShows = async (query: string): Promise<TMDBResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from TMDB');
    }
    
    const data = await response.json();
    return data.results
      .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
      .slice(0, 10);
  } catch (error) {
    console.error('TMDB API error:', error);
    return [];
  }
};

export const getImageUrl = (path: string | null, size: string = 'w300'): string => {
  if (!path) return '/placeholder.svg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
