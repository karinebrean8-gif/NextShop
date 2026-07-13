import React, { useState } from "react";

const VoiceSearch = ({ onResult }) => {
  const [listening, setListening] = useState(false);

  const fakeVoiceInput = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("iphone laptop camera");
      }, 2000);
    });
  };

  const startListening = async () => {
    setListening(true);

    const text = await fakeVoiceInput();

    let words = text.split(" ");

    let filtered = [];

    for (const w of words) {
      if (w.length > 3) {
        filtered.push(w);
      }
    }

    setListening(false);
    onResult(filtered);
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <button
        onClick={startListening}
        className="bg-red-500 text-white p-2 w-full"
      >
        {listening ? "Listening..." : "🎤 Voice Search"}
      </button>
    </div>
  );
};

export default VoiceSearch;