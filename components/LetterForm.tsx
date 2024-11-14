"use client"
import { useState } from 'react';

export default function LetterForm() {
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/generate-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ department, subject, content }),
    });

    const data = await response.json();
    setGeneratedLetter(data.letter);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <label>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Generate Letter</button>
      </form>

      {generatedLetter && (
        <div>
          <h2>Generated Letter</h2>
          <p>{generatedLetter}</p>
        </div>
      )}
    </div>
  );
}
