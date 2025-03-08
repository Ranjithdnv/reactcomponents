import React, { useEffect, useState } from "react";

const Voicechild = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      return new Promise((resolve) => {
        let availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length) {
          resolve(availableVoices);
        } else {
          const voiceHandler = () => {
            availableVoices = window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = null; // Remove event listener
            resolve(availableVoices);
          };

          window.speechSynthesis.onvoiceschanged = voiceHandler;

          // Fallback: Retry loading voices every 500ms until found
          const interval = setInterval(() => {
            availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length) {
              clearInterval(interval);
              resolve(availableVoices);
            }
          }, 500);

          // Timeout after 5 seconds if no voices found
          setTimeout(() => {
            clearInterval(interval);
            resolve(window.speechSynthesis.getVoices());
          }, 5000);
        }
      });
    };

    const initializeVoices = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure voices are available
      const availableVoices = await loadVoices();
      setVoices(availableVoices);
    };

    initializeVoices();
  }, []);

  useEffect(() => {
    if (voices.length > 0) {
      setSelectedVoice(voices[0].name);
      speak("Hi Ranjith, how are you?", voices[0]);
    }
  }, [voices]); // Speak only after voices are fully loaded

  const speak = (text, voice = null) => {
    if (!("speechSynthesis" in window)) {
      console.error("Web Speech API is not supported by this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    const chosenVoice = voice || voices.find((v) => v.name === selectedVoice);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Text to Speech (Speaks Once)</h1>
    </div>
  );
};

export default Voicechild;
