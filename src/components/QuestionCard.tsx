import { Link as RouterLink } from 'react-router-dom';
import type { Question } from '../types';
import { Card, CardActionArea, CardContent, Typography, Box, Button } from '@mui/material'; // Added Box, Button

interface Props {
    question: Question;
}

export default function QuestionCard({ question }: Props) {
    return (
        <Card sx={{ mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardActionArea component={RouterLink} to={`/questions/${question.id}`} sx={{ flexGrow: 1 }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {question.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    component={RouterLink}
                    to={`/questions/${question.id}/results`}
                    variant="outlined"
                    size="small"
                >
                    결과 보기
                </Button>
            </Box>
        </Card>
    );
}
