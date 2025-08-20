import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestion, voteOption } from "../api";
import type { Question } from "../types";

export default function QuestionDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question | null>(null);

    useEffect(() => {
        if (id) {
            getQuestion(Number(id)).then(setQuestion);
        }
    }, [id]);

    const handleVote = async (optionId: number) => {
        if (!id) return;
        await voteOption(optionId);
        navigate(`/results/${id}`);
    };

    if (!question) return <div>로딩 중...</div>;

    return (
        <div>
            <h1>{question.title}</h1>
            <ul>
                {question.options.map((option) => (
                    <li key={option.id}>
                        <button onClick={() => handleVote(option.id)}>{option.content}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}