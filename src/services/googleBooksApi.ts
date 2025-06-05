
export interface GoogleBookResult {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    pageCount?: number;
  };
}

export const searchBooks = async (query: string): Promise<GoogleBookResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Google Books API');
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Google Books API error:', error);
    return [];
  }
};
