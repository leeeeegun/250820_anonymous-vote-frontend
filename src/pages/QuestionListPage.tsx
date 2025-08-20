import { useEffect, useState } from "react";
import type {Question} from "../types";
import {getQuestions} from "../api";
import QuestionCard from "../components/QuestionCard.tsx";


export default function QuestionListPage() {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        getQuestions().then(setQuestions);
    }, []);

    return (
        <div>
            <h1>익명 투표 목록</h1>
            {questions.map((q) => (
                <QuestionCard key={q.id} question={q} />
            ))}
        </div>
    );
}