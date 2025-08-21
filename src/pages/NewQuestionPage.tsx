import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestion } from "../api";
import "./NewQuestionPage.css";

export default function NewQuestionPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState(["", ""]); // Start with two empty options
    const [error, setError] = useState<string | null>(null);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, ""]);
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
            setError("질문 제목을 입력해주세요.");
            return;
        }
        if (options.some(opt => !opt.trim())) {
            setError("모든 선택지 내용을 입력해주세요.");
            return;
        }

        try {
            // The API needs to be adjusted to handle this structure
            const newQuestion = await createQuestion({ title, options: options.map(o => ({ content: o })) });
            navigate(`/questions/${newQuestion.id}`);
        } catch (err) {
            console.error("투표 생성에 실패했습니다.", err);
            setError("투표 생성에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    return (
        <div className="new-question-page">
            <h1>새로운 투표 만들기</h1>
            <form onSubmit={handleSubmit} className="new-question-form">
                <div className="form-group">
                    <label htmlFor="title">투표 제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="예: 오늘 점심 뭐 먹을까요?"
                    />
                </div>

                <div className="form-group options-group">
                    <label>선택지</label>
                    {options.map((option, index) => (
                        <div key={index} className="form-group">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`선택지 ${index + 1}`}
                            />
                            {options.length > 2 && (
                                <button type="button" onClick={() => removeOption(index)} className="remove-option-btn">X</button>
                            )}
                        </div>
                    ))}
                     <button type="button" onClick={addOption} className="add-option-btn">+ 선택지 추가</button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" className="submit-btn">투표 생성하기</button>
            </form>
        </div>
    );
}
