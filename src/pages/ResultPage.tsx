import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getResults, getQuestion } from '../api';
import { Box, Typography, CircularProgress, Alert, Paper, LinearProgress, Button } from '@mui/material';
import type { Question } from '../types';

interface Result {
    option: string;
    votes: number;
}

export default function ResultPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            Promise.all([getQuestion(Number(id)), getResults(Number(id))])
                .then(([questionData, resultsData]) => {
                    setQuestion(questionData);
                    setResults(resultsData);
                    const total = resultsData.reduce((acc: number, curr: Result) => acc + curr.votes, 0);
                    setTotalVotes(total);
                })
                .catch(err => {
                    console.error('데이터를 불러오는 데 실패했습니다.', err);
                    setError('결과를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                투표 결과
            </Typography>
            <Typography variant="h6" component="h2" color="text.secondary" sx={{ mb: 4 }}>
                {question?.text}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                {results.map((res, idx) => {
                    const percentage = totalVotes > 0 ? (res.votes / totalVotes) * 100 : 0;
                    return (
                        <Box key={idx}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">{res.option}</Typography>
                                <Typography variant="body1" fontWeight="bold">{res.votes}표 ({percentage.toFixed(1)}%)</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, borderRadius: 5 }} />
                        </Box>
                    );
                })}
            </Box>

            <Typography variant="h6" textAlign="right" sx={{ mb: 4 }}>
                총 {totalVotes}표
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(`/questions/${id}`)}>
                    투표 페이지로 돌아가기
                </Button>
                <Button variant="contained" onClick={() => navigate('/')}>
                    다른 투표 보러가기
                </Button>
            </Box>
        </Paper>
    );
}
