import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { useEffect, useState } from 'react';
import { getQuestion, voteOption, deleteQuestion } from '../api'; // Added deleteQuestion
import type { Question } from '../types';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio, CircularProgress, Alert, Paper } from '@mui/material';

export default function QuestionDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false); // Added for alert
    const location = useLocation(); // Added useLocation

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getQuestion(Number(id))
                .then(setQuestion)
                .catch(err => {
                    console.error('질문을 불러오는 데 실패했습니다.', err);
                    setError('질문을 불러오는 데 실패했습니다. 다시 시도해 주세요.');
                })
                .finally(() => setIsLoading(false));
        }

        // Check if navigated from new question page
        if (location.state?.fromNewQuestion) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
                // Clear the state so the alert doesn't show again on refresh
                navigate(location.pathname, { replace: true, state: {} });
            }, 5000); // Alert disappears after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [id, location.state, location.pathname, navigate]); // Added dependencies

    const handleVote = async () => {
        if (!id || !selectedOption) {
            setError('투표할 항목을 선택해주세요.');
            return;
        }
        setIsSubmitting(true);
        setError(null);
        try {
            await voteOption(Number(id), Number(selectedOption));
            navigate(`/questions/${id}/results`);
        } catch (err) {
            console.error('투표 처리 중 오류가 발생했습니다.', err);
            setError('투표 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

    if (!question) {
        return <Alert severity="info">질문을 찾을 수 없습니다.</Alert>;
    }

    return (
        <Paper elevation={2} sx={{ p: 4 }}>
            {showAlert && ( // Conditionally render alert
                <Alert severity="success" sx={{ mb: 3 }}>
                    투표가 성공적으로 생성되었습니다!
                </Alert>
            )}
            <Typography variant="h4" component="h1" gutterBottom>
                {question.text}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                투표할 항목을 선택해주세요.
            </Typography>

            <RadioGroup
                aria-label="options"
                name="options-group"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                {question.options.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        value={option.id.toString()}
                        control={<Radio />}
                        label={option.text}
                        sx={{ mb: 1, border: '1px solid #ddd', borderRadius: 1, p: 1, m: 0 }}
                    />
                ))}
            </RadioGroup>

            {error && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(`/questions/${id}/results`)}>
                    결과 보기
                </Button>
                <Button
                    variant="contained"
                    onClick={handleVote}
                    disabled={!selectedOption || isSubmitting}
                >
                    {isSubmitting ? '투표하는 중...' : '투표하기'}
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete} // Added delete button
                >
                    삭제
                </Button>
            </Box>
        </Paper>
    );

    async function handleDelete() {
        if (!id) return;
        if (window.confirm('정말로 이 투표를 삭제하시겠습니까?')) {
            try {
                await deleteQuestion(Number(id));
                navigate('/'); // Navigate to home page after deletion
            } catch (err) {
                console.error('투표 삭제 중 오류가 발생했습니다.', err);
                setError('투표 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        }
    }
}
