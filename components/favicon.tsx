import React from 'react';
import { Globe } from 'lucide-react';
import { useFavicon } from './hooks/use-favicon';
import { Component } from './component';

interface FaviconDisplayProps {
  url: string | null;
}

export const Favicon: Component<FaviconDisplayProps> = ({ url }) => {
  const { faviconUrl, loading, error } = useFavicon(url || "");

  if (loading) return <Globe size={32} className="text-[#020817] dark:text-white" />;
  if (error || !faviconUrl) return <Globe size={32} className="text-[#020817] dark:text-white" />;

  return <img src={faviconUrl} alt="Favicon" className="rounded-full" width={32} height={32} />;
};