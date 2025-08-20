import { Link } from 'react-router-dom';
import type {Question} from "../types";

interface Props {
    question: Question;
}

export default function QuestionCard({ question }: Props) {
    return (
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h2>{question.title}</h2>
            <Link to={`/question/${question.id}`}>투표하기</Link>
        </div>
    );
};