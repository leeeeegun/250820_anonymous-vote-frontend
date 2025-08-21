import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { Question } from '../types';
import { getQuestions } from '../api';
import QuestionCard from '../components/QuestionCard';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

export default function QuestionListPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getQuestions()
            .then(setQuestions)
            .catch(err => {
                console.error('질문 목록을 불러오는 데 실패했습니다.', err);
                setError('질문 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    익명 투표 목록
                </Typography>
                <Button component={RouterLink} to="/questions/new" variant="contained">
                    + 새 투표 만들기
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" textAlign="center">
                    {error}
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {questions.length > 0 ? (
                        questions.map((q) => (
                            <Box key={q.id}>
                                <QuestionCard question={q} />
                            </Box>
                        ))
                    ) : (
                        <Box>
                            <Typography textAlign="center" sx={{ mt: 5 }}>
                                진행중인 투표가 없습니다.
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}
