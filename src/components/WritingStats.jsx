import React, { useState, useEffect } from 'react';

const WritingStats = ({ content }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [writeTime, setWriteTime] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);

  useEffect(() => {
    const words = content.trim().split(/\s+/);
    setWordCount(words.length);
    setCharCount(content.length);
  }, [content]);

  useEffect(() => {
    const timer = setInterval(() => {
      setWriteTime((prevTime) => prevTime + 1);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (writeTime > 0) {
      setWordsPerMinute(Math.round(wordCount / writeTime));
    }
  }, [wordCount, writeTime]);

  return (
    <div className="writing-stats bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <h3 className="text-lg font-semibold mb-2">Writing Statistics</h3>
      <ul className="space-y-2">
        <li>Words: {wordCount}</li>
        <li>Characters: {charCount}</li>
        <li>Time writing: {writeTime} minutes</li>
        <li>Words per minute: {wordsPerMinute}</li>
      </ul>
    </div>
  );
};

export default WritingStats;
