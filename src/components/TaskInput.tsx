import React, { useState, useEffect, useRef } from "react";
import { Plus, Mic } from "lucide-react";

interface TaskInputProps {
  onSubmit: (input: string) => void;
}

export function TaskInput({ onSubmit }: TaskInputProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a natural language task... (e.g., 'Remind me to call mom every Sunday at 9am')"
          className="flex-1 px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
        />

        {/* 🎤 Voice Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`absolute right-12 transition-colors ${
            isListening ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Voice input"
        >
          <Mic size={20} />
        </button>

        {/* ➕ Submit Button */}
        <button
          type="submit"
          disabled={!input.trim()}
          className="absolute right-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          aria-label="Add task"
        >
          <Plus size={16} />
        </button>
      </div>
    </form>
  );
}
