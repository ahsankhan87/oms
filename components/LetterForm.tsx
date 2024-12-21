"use client";

import { LetterFormProps } from "@/types";
import { useState } from "react";

export default function LetterForm({ onGenerate, loading }: LetterFormProps) {
 
  const [department, setDepartment] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (department && topic) {
      onGenerate(department, topic);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Generate a Government Letter
      </h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Government Department
        </label>
        <input
          type="text"
          placeholder="e.g., Establishment Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Topic
        </label>
        <input
          type="text"
          placeholder="e.g., Request for Road Repair"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
      >
        {loading ? "Generating..." : "Generate Letter"}
      </button>
    </form>
  );
}
