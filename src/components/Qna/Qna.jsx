import { useEffect, useRef, useState } from "react";
import "./Qna.css";

function Qna({ qna, onChange, onSave }) {
  const headerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const safeQna = {
    question: qna?.question ?? "",
    answer: qna?.answer ?? ""
  };

  useEffect(() => {
    if (headerRef.current) {
      const val = safeQna.question || "";
      headerRef.current.textContent = val;
      if (val === "") {
        headerRef.current.blur(); // this ensures :not(:focus):empty triggers
      }
    }
  }, [qna]);

  const handleHeaderInput = (e) => {
    const content = e.currentTarget.textContent.trim();
    onChange("question", content);
  };
  const handleAnswerInput = (e) => {
    onChange("answer", e.currentTarget.value);
  };


  return (
    <main className="qna-editor-content">
      <div className={`qna-question-header ${isFocused ? "focused" : ""}`}>
        <div
          className="editable-question"
          ref={headerRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleHeaderInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          data-placeholder="Type your question..."
        />
      </div>

      <div className="qna-field-section">
        <label className="qna-label">Answer</label>
        <textarea
          className="qna-textarea"
          value={safeQna.answer ?? ""}
          onChange={handleAnswerInput}
          placeholder="Enter the bot answer..."
        />
      </div>

      <button className="qna-save-btn" onClick={onSave}>
        Save QnA
      </button>
    </main>
  );
}

export default Qna;
