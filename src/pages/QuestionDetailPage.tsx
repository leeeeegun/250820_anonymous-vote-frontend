import {useNavigate, useParams} from "react-router-dom";
import type {Question} from "../types";
import {useEffect, useState} from "react";
import {getQuestion, voteOption} from "../api";


export default function QuestionDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question | null>(null);

    useEffect(() => {
        if (id) {
            getQuestion(Number(id)).then(setQuestion);
        }
    }, [id]);

    const handleVote = async (optionIndex: number) => {
        if (!id) return;
        await voteOption(Number(id), optionIndex);
        navigate(`/results/${id}`);
    };

    if (!question) return <div>로딩 중...</div>

    return (
        <div>
            <h1>{question.title}</h1>
            <ul>
                {question.options.map((opt, idx) => (
                    <li key={idx}>
                        <button onClick={() => handleVote(idx)}>{opt}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}