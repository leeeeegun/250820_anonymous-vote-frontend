export interface Question {
    id: number;
    title: string;
    options: string[];
}

export interface Option {
    id: number;
    content: string;
    votes: number;
}