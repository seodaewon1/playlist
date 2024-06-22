// MusicPlayerProvider.js
import React, { createContext, useEffect, useState } from 'react';

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`./data/Daewon.json`);
                const data = await response.json();
                setMusicData(data);
                console.log(data);
            } catch (error) {
                console.error('데이터를 가져오는데 실패했습니다.', error);
            }
        };
        fetchData();
    }, []);

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
        setPlayed(0);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        if (isShuffling) {
            setCurrentTrackIndex(Math.floor(Math.random() * musicData.length));
        } else {
            setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicData.length);
        }
        setIsPlaying(true);
        setPlayed(0);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
        setIsPlaying(true);
        setPlayed(0);
    };

    const updatePlayed = (played) => {
        setPlayed(played);
    };

    const updateDuration = (duration) => {
        setDuration(duration);
    };

    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    const toggleRepeat = () => {
        setIsRepeating(!isRepeating);
    };

    const handleTrackEnd = () => {
        if (isRepeating) {
            setPlayed(0);
            setIsPlaying(true);
        } else {
            nextTrack();
        }
    };

    // 재생 목록에 트랙을 추가하는 함수
    const addTrackToList = (track) => {
        setMusicData((prevMusicData) => [track, ...prevMusicData]);
    };

    // 재생 목록의 끝에 트랙을 추가하는 함수
    const addTrackToEnd = (track) => {
        setMusicData((prevMusicData) => [...prevMusicData, track]);
    };

    // 재생 목록에서 트랙을 제거하는 함수
    const removeTrack = (index) => {
        setMusicData((prevMusicData) => {
            const newMusicData = prevMusicData.filter((_, i) => i !== index);
            if (currentTrackIndex === index && newMusicData.length > 0) {
                setCurrentTrackIndex((prevIndex) => Math.min(prevIndex, newMusicData.length - 1));
            } else if (newMusicData.length === 0) {
                setCurrentTrackIndex(0);
                setIsPlaying(false);
            }
            return newMusicData;
        });
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                musicData,
                currentTrackIndex,
                isPlaying,
                played,
                duration,
                playTrack,
                pauseTrack,
                prevTrack,
                nextTrack,
                updatePlayed,
                updateDuration,
                isShuffling,
                toggleShuffle,
                isRepeating,
                toggleRepeat,
                handleTrackEnd,
                addTrackToList,
                addTrackToEnd,
                removeTrack // 삭제 함수 추가
            }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export default MusicPlayerProvider;
