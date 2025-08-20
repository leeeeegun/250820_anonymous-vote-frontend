import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getResults} from "../api";


export default function ResultPage() {
    const {id} = useParams<{ id: string }>();
    const [results, setResults] = useState<{ option: string; votes: number }[]>([]);

    useEffect(() => {
        if (!id) {
            getResults(Number(id)).then(setResults);
        }
    }, [id]);

    return (
        <div>
            <h1>결과</h1>
            <ul>
                {results.map((res, idx) => (
                    <li key={idx}>
                        {res.option}: {res.votes}표
                    </li>
                ))}
            </ul>
        </div>
    );
}