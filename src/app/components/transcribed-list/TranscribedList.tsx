import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../search-filter-bar/SearchBar';
import { AiOutlineDelete, AiOutlineSound, AiOutlinePause, AiOutlinePlayCircle } from 'react-icons/ai';

interface TranscribedListProps {
  audioData: { file: File; name: string }[];
  onRemoveAudio: (recordingName: string) => void;
}

const TranscribedList = ({ audioData, onRemoveAudio }: TranscribedListProps) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [mutedIndex, setMutedIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const togglePlayPause = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      if (audio.paused) {
        audio.play();
        setPlayingIndex(index);
      } else {
        audio.pause();
        setPlayingIndex(null);
      }
    }
  };

  const toggleMute = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.muted = !audio.muted;
      setMutedIndex(audio.muted ? index : null);
    }
  };

  const handleAudioStop = (index: number) => {
    setPlayingIndex(null);
  };

  useEffect(() => {
    const audioRefsCopy = audioRefs.current;

    audioRefsCopy.forEach((audio, index) => {
      if (audio) {
        audio.addEventListener('pause', () => handleAudioStop(index));
        audio.addEventListener('ended', () => handleAudioStop(index));
      }
    });

    return () => {
      audioRefsCopy.forEach((audio, index) => {
        if (audio) {
          audio.removeEventListener('pause', () => handleAudioStop(index));
          audio.removeEventListener('ended', () => handleAudioStop(index));
        }
      });
    };
  }, [audioData]);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Recordings</h1>
        <SearchBar />
        <div className="flex flex-col overflow-y-auto" style={{ maxHeight: '60vh' }}>
          {audioData.length > 0 ? (
            audioData.map((recording, index) => (
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              <div key={index} className="flex justify-between mt-4 p-8 bg-blue-50 rounded-lg border-2">
                <div className="w-full flex justify-between items-center">
                  <h3 className="text-xl font-bold text-center">{recording.name}</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => togglePlayPause(index)}
                      className="flex items-center justify-center text-blue-500 hover:text-blue-700"
                    >
                      {playingIndex === index ? <AiOutlinePause size={32} /> : <AiOutlinePlayCircle size={32} />}
                    </button>
                    <button
                      onClick={() => toggleMute(index)}
                      className="flex items-center justify-center text-blue-500 hover:text-blue-700"
                    >
                      {mutedIndex === index ? <AiOutlineSound size={32} className="text-gray-500" /> : <AiOutlineSound size={32} />}
                    </button>
                    <button
                      onClick={() => onRemoveAudio(recording.name)}
                      className="flex items-center justify-center text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete size={32} />
                    </button>
                  </div>
                  <audio
                    ref={(el) => { audioRefs.current[index] = el }}
                    controls
                    className="w-full hidden"
                  >
                    <source src={URL.createObjectURL(recording.file)} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))
          ) : (
            <div className="text-lg">
              <p>No recordings available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscribedList;
