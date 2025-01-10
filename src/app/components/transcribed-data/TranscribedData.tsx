import React from 'react'
import Header from '../header/Header'
import TranscribedList from '../transcribed-list/TranscribedList'

interface TranscribedDataProps {
  audioData: { file: File; name: string }[];
  onRemoveAudio: (recordingName: string) => void;
}

const TranscribedData = ({ audioData, onRemoveAudio }: TranscribedDataProps) => {

  return (
    <div className='w-full flex flex-col h-full border-2 rounded-2xl'>
      <Header />
      <TranscribedList audioData={audioData} onRemoveAudio={onRemoveAudio} />
    </div>
  )
}

export default TranscribedData