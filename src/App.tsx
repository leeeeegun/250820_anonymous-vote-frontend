import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import ResultPage from "./pages/ResultPage";
import NewQuestionPage from "./pages/NewQuestionPage"; // 추가
import './App.css';

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<QuestionListPage />} />
                    <Route path="/questions/new" element={<NewQuestionPage />} /> // 추가
                    <Route path="/questions/:id" element={<QuestionDetailPage />} />
                    <Route path="/questions/:id/results" element={<ResultPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
