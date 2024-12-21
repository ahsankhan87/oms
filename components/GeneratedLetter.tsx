interface GeneratedLetterProps {
    letter: string | null;
    error: string;
  }
  
  export default function GeneratedLetter({ letter, error }: GeneratedLetterProps) {
    if (error) {
      return <p className="mt-4 text-sm text-red-600">{error}</p>;
    }
  
    if (letter) {
      return (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Generated Letter:</h2>
          <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{letter}</p>
        </div>
      );
    }
  
    return null;
  }
  