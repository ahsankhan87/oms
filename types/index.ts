export interface GenerateLetterRequest {
    department: string;
    subject: string;
    content: string;
}

export interface GenerateLetterResponse {
    letter: string;
}
