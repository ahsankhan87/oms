"use client";

import { useState } from "react";
import LetterForm from "../components/LetterForm";
import GeneratedLetter from "../components/GeneratedLetter";

export default function HomePage() {
  const [letter, setLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (department: string, topic: string) => {
    setLoading(true);
    setError("");
    setLetter(null);

    try {
      const response = await fetch("/api/generate-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ department, topic }),
      });

      const data = await response.json();
      if (data.letter) {
        setLetter(data.letter);
      } else {
        setError("Failed to generate letter. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full">
        <LetterForm onGenerate={handleGenerate} loading={loading} />
        <GeneratedLetter letter={letter} error={error} />
      </div>
    </div>
  );
}
