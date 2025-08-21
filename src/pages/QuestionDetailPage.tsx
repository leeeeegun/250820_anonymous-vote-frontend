import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestion, voteOption } from "../api";
import type { Question } from "../types";
import "./QuestionDetailPage.css";

export default function QuestionDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getQuestion(Number(id))
                .then(setQuestion)
                .catch(err => {
                    console.error("질문을 불러오는 데 실패했습니다.", err);
                    setError("질문을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    const handleVote = async (optionId: number) => {
        if (!id) return;
        try {
            await voteOption(Number(id), optionId);
            navigate(`/questions/${id}/results`);
        } catch (err) {
            console.error("투표 처리 중 오류가 발생했습니다.", err);
            setError("투표 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;
    if (!question) return <div>질문을 찾을 수 없습니다.</div>;

    return (
        <div className="question-detail-page">
            <h1>{question.title}</h1>
            <ul className="options-list">
                {question.options.map((option) => (
                    <li key={option.id}>
                        <button className="option-button" onClick={() => handleVote(option.id)}>
                            {option.content}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}