import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 추가
import type { Question } from "../types";
import { getQuestions } from "../api";
import QuestionCard from "../components/QuestionCard.tsx";
import "./QuestionListPage.css";

export default function QuestionListPage() {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        getQuestions().then(setQuestions).catch(err => {
            console.error("질문 목록을 불러오는 데 실패했습니다.", err);
            // 사용자에게 에러를 보여주는 UI를 추가할 수 있습니다.
        });
    }, []);

    return (
        <div className="question-list-page">
            <div className="page-header">
                <h1>익명 투표 목록</h1>
                <Link to="/questions/new" className="create-poll-btn">+ 새 투표 만들기</Link>
            </div>
            <div className="question-list">
                {questions.length > 0 ? (
                    questions.map((q) => (
                        <QuestionCard key={q.id} question={q} />
                    ))
                ) : (
                    <p>진행중인 투표가 없습니다.</p>
                )}
            </div>
        </div>
    );
}