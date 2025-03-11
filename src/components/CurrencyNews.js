import React, { useState, useEffect } from "react";

function CurrencyNews() {
  // State to store the news articles
  const [news, setNews] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  // Fetch news articles when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch news related to currency exchange using the NewsAPI
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=currency+exchange&apiKey=b932f9f6026445ff95129722b2c3ce5c`
        );
        const data = await response.json();
        // Update the news state with the fetched articles
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        // Set loading to false once the data is fetched (or if an error occurs)
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="mt-8">
      {/* Section title */}
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Currency News</h2>

      {/* Display loading message while fetching data */}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading news...</div>
      ) : (
        // Grid layout for news articles
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Map through the first 4 articles and display them */}
          {news.slice(0, 4).map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Article title */}
              <h3 className="text-lg font-semibold dark:text-white">{article.title}</h3>
              {/* Article description */}
              <p className="text-sm text-gray-600 dark:text-gray-300">{article.description}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencyNews;