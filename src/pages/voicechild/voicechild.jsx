import React, { useEffect, useState } from "react";

const Voicechild = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speakInterval, setSpeakInterval] = useState(false); // State to trigger repeated speech

  useEffect(() => {
    const loadVoices = () => {
      return new Promise((resolve) => {
        let availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length) {
          resolve(availableVoices);
        } else {
          // If voices are not available immediately, listen for 'voiceschanged'
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

      // Automatically select the first voice if available
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }

      // Start the interval for repeated speech
      setSpeakInterval(true);
    };

    initializeVoices();
  }, []);

  useEffect(() => {
    if (speakInterval) {
      const interval = setInterval(() => {
        console.log(0);
        speak("hi ranjith how r u doing"); // Speak every 4 seconds

        setSpeakInterval(false);
      }, 1000);

      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, [speakInterval, voices, selectedVoice]); // Ensure it re-runs when voices or selectedVoice changes

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      console.error("Web Speech API is not supported by this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set language to English
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    // Set the selected voice
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Text to Speech (Auto-Speak "hi" Every 4 Seconds)
      </h1>
    </div>
  );
};

export default Voicechild;
