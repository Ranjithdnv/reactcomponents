import React, { useEffect, useState } from "react";

const Voicechild = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false); // Prevent multiple speeches

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setSelectedVoice(availableVoices[0]); // Set first available voice
      }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    // Ensure voices load after full page load
    window.onload = () => {
      updateVoices();
    };

    // Extra fallback in case voices take time to load
    setTimeout(() => {
      if (voices.length === 0) {
        updateVoices();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (!hasSpoken && voices.length > 0 && selectedVoice) {
      setHasSpoken(true); // Ensure it speaks only once
      speak("Hi Ranjith, how are you?");
    }
  }, [voices, selectedVoice, hasSpoken]);

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      console.error("Web Speech API is not supported by this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Text to Speech (Speaks Once on Load)
      </h1>
    </div>
  );
};

export default Voicechild;
