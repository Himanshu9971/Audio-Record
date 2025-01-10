'use client';
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdMic, MdStopCircle, MdStop, MdAudiotrack, MdPause, MdPlayArrow } from 'react-icons/md';
import InputField from '../input-fields/InputFields';

interface AudioControlProps {
    onSaveRecording: (audioFile: File, recordingName: string) => void;
}

const AudioControl = ({ onSaveRecording }: AudioControlProps) => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
    const [isClient, setIsClient] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingName, setRecordingName] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const intervalRef = useRef<any>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('audio')) {
            setAudioFile(file);
            setAudioUrl(URL.createObjectURL(file));
        } else {
            alert('Please upload a valid audio file');
        }
    };

    const removeAudioFile = () => {
        setAudioFile(null);
        setAudioUrl(undefined);
        setRecordingName('');
    };

    const startRecording = async () => {
        if (!navigator.mediaDevices || !window.MediaRecorder) {
            alert('Your browser does not support audio recording.');
            return;
        }

        setIsRecording(true);
        setRecordingTime(0);
        audioChunksRef.current = [];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                setAudioFile(new File([audioBlob], 'recording.wav', { type: 'audio/wav' }));
            };

            mediaRecorderRef.current.start();

            intervalRef.current = setInterval(() => {
                setRecordingTime((prevTime) => prevTime + 1);
            }, 1000);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(intervalRef.current);

            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((track) => {
                    track.stop();
                });
                mediaStreamRef.current = null;
                console.log('Microphone access stopped.');
            }
        }
    };

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const progress = (recordingTime / 60) * 100;

    const saveRecording = () => {
        if (!audioFile || !recordingName.trim()) {
            alert('Please provide a name for the recording.');
            return;
        }

        onSaveRecording(audioFile, recordingName);

        setAudioFile(null);
        setAudioUrl(undefined);
        setRecordingName('');
    };

    const isRecordingNameEmpty = recordingName.trim() === '';

    const handlePlayPause = () => {
        if (audioElementRef.current) {
            if (isPlaying) {
                audioElementRef.current.pause();
            } else {
                audioElementRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleStop = () => {
        if (audioElementRef.current) {
            audioElementRef.current.pause();
            audioElementRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (audioElementRef.current) {
            setRecordingTime(Math.floor(audioElementRef.current.currentTime));
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className={`${audioFile ? 'p-16' : 'py-16'} w-full flex flex-col items-center justify-center mx-auto gap-16 border-2 rounded-3xl py-16`}>
            {!audioFile && (
                <div className="w-full justify-center flex items-center space-x-4 relative">
                    <div className={`${isRecording ? 'border-red-100' : 'border-blue-100'} w-60 h-60 flex items-center justify-center rounded-full border-[1px] bg-transparent`}>
                        <div className={`${isRecording ? 'border-red-200' : 'border-blue-200'} w-56 h-56 flex items-center justify-center rounded-full border-[1px] bg-transparent`}>
                            <div className={`${isRecording ? 'border-red-300' : 'border-blue-300'} w-52 h-52 flex items-center justify-center rounded-full border-[1px] bg-transparent`}>
                                <div
                                    className="absolute w-40 h-40 rounded-full"
                                    style={{
                                        background: `conic-gradient(rgb(191 219 254) ${progress}%, transparent 0)`,
                                    }}
                                ></div>
                                {isRecording ? (
                                    <button
                                        onClick={stopRecording}
                                        className="w-36 h-36 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none relative"
                                    >
                                        <MdStopCircle size={72} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={startRecording}
                                        className="w-36 h-36 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none relative"
                                    >
                                        <MdMic size={72} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {audioFile && (
                <div className="w-full h-full">
                    <div className="flex items-center justify-between w-full mb-8">

                        <div className="flex w-full items-center justify-between mt-4">
                            <div className="flex w-full max-w-52 justify-between items-center">
                                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-200'>
                                    <button
                                        onClick={handlePlayPause}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        {isPlaying ? <MdPause size={32} /> : <MdPlayArrow size={32} />}
                                    </button>
                                </div>
                                <div className="text-xl">
                                    {formatTime(recordingTime)}
                                </div>
                                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-200'>
                                    <button
                                        onClick={handleStop}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <MdStop size={32} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {audioUrl &&isClient && (
                            <audio
                                ref={audioElementRef}
                                onTimeUpdate={handleTimeUpdate}
                                className="hidden"
                            >
                                <source src={audioUrl} type="audio/wav" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        
                        <div className="flex justify-end items-center w-full">
                            <AiOutlineDelete
                                onClick={removeAudioFile}
                                className="text-red-500 cursor-pointer hover:text-red-700"
                                size={24}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col h-72 justify-around">
                        <h2 className="text-2xl font-bold mb-4">Save Recording</h2>
                        <InputField
                            label="Recording Name"
                            type="text"
                            value={recordingName}
                            onChange={(e) => setRecordingName(e.target.value)}
                            placeholder="Enter Recording Name"
                            name="recordingName"
                            widthFull={true}
                            isIcon={false}
                        />
                    </div>

                    <div className="grid grid-cols-2 w-full gap-8 items-center justify-between mb-8">
                        <button
                            onClick={saveRecording}
                            className={`${isRecordingNameEmpty && 'opacity-50 cursor-not-allowed'} mt-4 w-full py-4 bg-white text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white border-blue-500 border-2`}
                            disabled={isRecordingNameEmpty}
                        >
                            Save Recording
                        </button>
                        <button
                            onClick={saveRecording}
                            className={`${isRecordingNameEmpty && 'opacity-50 cursor-not-allowed'} mt-4 w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-white hover:text-blue-500 border-transparent hover:border-blue-500 border-2`}
                            disabled={isRecordingNameEmpty}
                        >
                            Transcribe Recording
                        </button>
                    </div>
                </div>
            )}

            {!audioFile && (
                <div className="flex items-center space-x-4 mt-4">
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="audio-upload"
                    />
                    <label htmlFor="audio-upload" className="flex items-center justify-center gap-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-60">
                        <MdAudiotrack className="text-3xl text-white" />
                        <span className="text-md">Upload Audio</span>
                    </label>
                </div>
            )}
        </div>
    );
};

export default AudioControl;
