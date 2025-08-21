import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import ResultPage from "./pages/ResultPage";
import NewQuestionPage from "./pages/NewQuestionPage";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material"; // Removed CssBaseline

function App() {
    return (
        <Router>
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            익명 투표
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4, p: 3 }}>
                <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
                    <Routes>
                        <Route path="/" element={<QuestionListPage />} />
                        <Route path="/questions/new" element={<NewQuestionPage />} />
                        <Route path="/questions/:id" element={<QuestionDetailPage />} />
                        <Route path="/questions/:id/results" element={<ResultPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
}

export default App;
