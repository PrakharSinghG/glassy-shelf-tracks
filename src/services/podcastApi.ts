
// Using iTunes Search API for podcasts (free, no API key required)
export interface PodcastResult {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  artworkUrl600: string;
  collectionName: string;
  description?: string;
  feedUrl?: string;
  releaseDate: string;
}

export const searchPodcasts = async (query: string): Promise<PodcastResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=podcast&limit=10`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch podcasts');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Podcast API error:', error);
    return [];
  }
};
