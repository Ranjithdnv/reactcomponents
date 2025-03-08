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
          window.speechSynthesis.onvoiceschanged = () => {
            availableVoices = window.speechSynthesis.getVoices();
            resolve(availableVoices);
          };
        }
      });
    };

    const initializeVoices = async () => {
      const availableVoices = await loadVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }

      // Speak only once after voices are loaded
      speak("Hi Ranjith, how are you?");
    };

    initializeVoices();
  }, []);

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

    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
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
