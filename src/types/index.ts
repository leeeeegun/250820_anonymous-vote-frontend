export interface Question {
    id: number;
    text: string;
    options: Option[];
}

export interface Option {
    id: number;
    text: string;
    votes: number;
}

export interface QuestionCreateDTO {
    text: string;
    options: { text: string }[];
}
