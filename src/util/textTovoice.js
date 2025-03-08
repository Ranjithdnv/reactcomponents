// Function to speak a given text
function speak(text) {
  // Check if the Web Speech API is supported
  if (!("speechSynthesis" in window)) {
    console.error("Web Speech API is not supported by this browser.");
    return;
  }

  // Create a new speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Optional: Customize voice settings
  utterance.lang = "en-US"; // Set language (e.g., 'en-GB', 'en-US', etc.)
  utterance.pitch = 1; // Pitch level (0 to 2, default is 1)
  utterance.rate = 1; // Speaking rate (0.1 to 10, default is 1)
  utterance.volume = 1; // Volume level (0 to 1)

  // Optional: Event listeners for debugging or user interaction
  utterance.onstart = () => console.log("Speech started");
  utterance.onend = () => console.log("Speech ended");
  utterance.onerror = (event) => console.error("Speech error:", event.error);

  // Speak the text
  window.speechSynthesis.speak(utterance);
}

// Example usage
speak("Hello! This is a text-to-speech example using the Web Speech API.");
