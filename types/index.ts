export interface LetterFormProps {
    onGenerate: (department: string, topic: string) => void;
    loading: boolean;
}

export interface GenerateLetterResponse {
    letter: string;
}
