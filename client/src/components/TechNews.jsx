import React, { useState, useEffect } from 'react';

const TechNews = () => {
  const [news, setNews] = useState([
    "Loading latest Tech News from Times of India...",
    "Fetching updates..."
  ]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 1. Fetch Real News from Times of India (Tech Section)
    const fetchNews = async () => {
      try {
        // We use rss2json to convert the RSS feed to JSON so React can read it
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://timesofindia.indiatimes.com/rssfeeds/66949542.cms"
        );
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          // Take the top 5 headlines
          const headlines = data.items.slice(0, 5).map(item => item.title);
          setNews(headlines);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([
          "React 19 Release Date Announced", 
          "AI takes over coding jobs? Here is the truth.", 
          "New MacBook Pro M4 Leaks"
        ]); // Fallback if API fails
      }
    };

    fetchNews();
  }, []);

  // 2. Rotate Headlines every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [news]);

  return (
    <div className="bg-gray-900 text-green-400 py-2 px-4 rounded-lg mb-6 w-full max-w-2xl border border-green-900/50 shadow-inner overflow-hidden">
      <div className="flex items-center gap-3">
        <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded animate-pulse whitespace-nowrap">
          TOI TECH NEWS
        </span>
        <p className="text-sm font-mono truncate animate-fade-in-up transition-all duration-500">
          {news[index]}
        </p>
      </div>
    </div>
  );
};

export default TechNews;