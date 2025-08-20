export interface Question {
    id: number;
    title: string;
    options: Option[];
}

export interface Option {
    id: number;
    content: string;
    votes: number;
}