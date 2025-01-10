'use client'
import { useState } from "react";
import AudioControl from "../components/audio-control/AudioControl";
import TranscribedData from "../components/transcribed-data/TranscribedData";

export default function AudioToText() {
  const [audioData, setAudioData] = useState<{ file: File; name: string }[]>([]);

    const handleSaveRecording = (audioFile: File, recordingName: string) => {
      setAudioData((prevData) => [...prevData, { file: audioFile, name: recordingName }]);
    };

    const handleRemoveAudio = (recordingName: string) => {
      setAudioData((prevData) => prevData.filter(recording => recording.name !== recordingName));
    };
    
  return (
    <div className="h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="rounded-3xl bg-white w-full max-w-[1440px] mx-auto h-full">
        <div className="grid grid-cols-2 gap-8 h-full">
            <TranscribedData audioData={audioData} onRemoveAudio={handleRemoveAudio} />
            <AudioControl onSaveRecording={handleSaveRecording} />
        </div>        
      </main>
    </div>
  );
}
