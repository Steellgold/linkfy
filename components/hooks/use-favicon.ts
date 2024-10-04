import { extractDomain } from '@/lib/link';
import { useState, useEffect } from 'react';

const fetchFaviconUrl = async (url: string): Promise<string | null> => {
  const domain = extractDomain(url);

  try {
    const response = await fetch(`https://${domain}/favicon.ico`, { method: 'HEAD' });
    if (response.ok) {
      return `https://${domain}/favicon.ico`;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

interface UseFaviconReturn {
  faviconUrl: string | null;
  loading: boolean;
  error: string | null;
}

export const useFavicon = (url: string): UseFaviconReturn => {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedFavicon = await fetchFaviconUrl(url);
        setFaviconUrl(fetchedFavicon);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      }
      setLoading(false);
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { faviconUrl, loading, error };
};