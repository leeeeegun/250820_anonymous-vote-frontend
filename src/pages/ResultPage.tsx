import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getResults } from "../api";
import "./ResultPage.css";

interface Result {
    option: string;
    votes: number;
}

export default function ResultPage() {
    const { id } = useParams<{ id: string }>();
    const [results, setResults] = useState<Result[]>([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getResults(Number(id))
                .then(data => {
                    setResults(data);
                    const total = data.reduce((acc: number, curr: Result) => acc + curr.votes, 0);
                    setTotalVotes(total);
                })
                .catch(err => {
                    console.error("결과를 불러오는 데 실패했습니다.", err);
                    setError("결과를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    if (isLoading) return <div>결과를 불러오는 중...</div>;
    if (error) return <div>오류: {error}</div>;

    return (
        <div className="result-page">
            <h1>투표 결과</h1>
            <ul className="results-list">
                {results.map((res, idx) => {
                    const percentage = totalVotes > 0 ? (res.votes / totalVotes) * 100 : 0;
                    return (
                        <li key={idx} className="result-item">
                            <div className="result-item-info">
                                <span>{res.option}</span>
                                <span>{res.votes}표 ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="result-bar-container">
                                <div className="result-bar" style={{ width: `${percentage}%` }}>
                                    {percentage > 10 && `${percentage.toFixed(1)}%`}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}