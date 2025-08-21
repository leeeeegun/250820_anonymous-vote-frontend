import { Link } from "react-router-dom";
import type { Question } from "../types";
import "./QuestionCard.css";

interface Props {
    question: Question;
}

export default function QuestionCard({ question }: Props) {
    return (
        <Link to={`/questions/${question.id}`} className="question-card">
            <h2>{question.title}</h2>
        </Link>
    );
}