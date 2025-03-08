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
            window.speechSynthesis.onvoiceschanged = null; // Remove event listener after execution
            resolve(availableVoices);
          };

          window.speechSynthesis.onvoiceschanged = voiceHandler;

          // Fallback: Load voices manually after a short delay
          setTimeout(() => {
            if (!availableVoices.length) {
              availableVoices = window.speechSynthesis.getVoices();
              resolve(availableVoices);
            }
          }, 500);
        }
      });
    };

    const initializeVoices = async () => {
      const availableVoices = await loadVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
        speak("Hi Ranjith, how are you?", availableVoices[0]);
      }
    };

    initializeVoices();
  }, []);

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
