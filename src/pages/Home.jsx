import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split('T')[0];

  const chartUrls = [
    `https://raw.githubusercontent.com/webs9919/music-best/main/melon/melon100_${formattedDate}.json`,
    `https://raw.githubusercontent.com/webs9919/music-best/main/bugs/bugs100_${formattedDate}.json`,
    `https://raw.githubusercontent.com/webs9919/music-best/main/genie/genie100_${formattedDate}.json`,
    `https://raw.githubusercontent.com/webs9919/music-best/main/billboard/billboard100_${formattedDate}.json`,
    `https://raw.githubusercontent.com/webs9919/music-best/main/apple/apple100_${formattedDate}.json`,
  ];

  const chartTitles = ["멜론", "벅스", "지니", "빌보드", "애플"];

  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const responses = await Promise.all(chartUrls.map((url) => axios.get(url)));
        setCharts(responses.map((response) => response.data.slice(0, 5)));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home">
      <h2>환영합니다! 🎵</h2>
      <p>당신만의 음악 플레이리스트를 만들어 보세요.</p>
      <h1>TOP5</h1>
      <div className="chartli">
        {charts.map((chart, index) => (
          <div key={index} className="chart-section">
            <h3>{chartTitles[index]}</h3>
            <ul>
              {chart.map((song, songIndex) => (
                <li key={songIndex}>
                  <div className="song-info">
                    <span className="rank">#{song.rank}</span>
                    <img src={song.imageURL} alt={song.title} />
                    <span className="title">{song.title} - {song.artist}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
