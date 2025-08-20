export interface Question {
    id: number;
    title: string;
    createdAt: string;
    options: Option[];
}

export interface Option {
    id: number;
    content: string;
    votes: number;
}