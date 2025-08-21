import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../api';
import { Box, TextField, Button, Typography, IconButton, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function NewQuestionPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError('질문 제목을 입력해주세요.');
            return;
        }
        if (options.some(opt => !opt.trim())) {
            setError('모든 선택지 내용을 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const newQuestion = await createQuestion({ text: title, options: options.filter(o => o.trim() !== '').map(o => ({ text: o })) });
            navigate(`/questions/${newQuestion.id}`, { state: { fromNewQuestion: true } });
        } catch (err) {
            console.error('투표 생성에 실패했습니다.', err);
            setError('투표 생성에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                새로운 투표 만들기
            </Typography>

            <TextField
                id="title"
                label="투표 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 오늘 점심 뭐 먹을까요?"
                fullWidth
                required
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">선택지</Typography>
                {options.map((option, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            label={`선택지 ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            fullWidth
                            required
                        />
                        <IconButton
                            onClick={() => removeOption(index)}
                            disabled={options.length <= 2}
                            color="error"
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    type="button"
                    onClick={addOption}
                    startIcon={<AddCircleOutlineIcon />}
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                >
                    선택지 추가
                </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    뒤로 가기
                </Button>
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                    {loading ? '생성 중...' : '투표 생성하기'}
                </Button>
            </Box>
        </Box>
    );
}
