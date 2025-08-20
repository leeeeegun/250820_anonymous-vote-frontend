import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import ResultPage from "./pages/ResultPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<QuestionListPage />} />
                <Route path="/questions/:id" element={<QuestionDetailPage />} />
                <Route path="/questions/:id/results" element={<ResultPage />} />
            </Routes>
        </Router>
    );
}

export default App;
