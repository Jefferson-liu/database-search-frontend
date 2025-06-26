import { useEffect, useRef, useState } from "react";
import useAutosaveWebhook from "../../hooks/useAutosaveWebhook";
import ChatTextBox from "../ChatTextBox/ChatTextBox";
import SearchResults from "../SearchResults/SearchResults";
import "./Qna.css";

function Qna({ qna, onChange, onSave }) {
  const headerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const handleRowClick = () => {
    console.log("Row clicked");
  };
  const safeQna = {
    customer_name: qna?.customer_name ?? "",
    messages: qna?.messages ?? []
  };
  const samplePlans = [
    {
      item_name: "Test Plan",
      provider: "Test Provider",
      region: "Test Region",
      promotion_price: 10,
      original_price: 20,
      data: 5,
      roaming: ["canada"],
      free_ld: "Test LD",
      activation_fee: 0,
      promo_start_date: "2025-01-01"
    }
  ];

  useEffect(() => {
    if (headerRef.current) {
      const val = safeQna.customer_name || "";
      headerRef.current.textContent = val;
      if (val === "") {
        headerRef.current.blur(); // this ensures :not(:focus):empty triggers
      }
    }
  }, [qna]);

  const handleHeaderInput = (e) => {
    const content = e.currentTarget.textContent.trim();
    onChange("customer_name", content);
  };

  // Autosave when customer_name changes
  useAutosaveWebhook(qna);

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
          data-placeholder="Enter Customer Name"
        />
      </div>

      <div className="chat-and-results-layout">
        <div className="chat-half">
          <ChatTextBox messages={messages} input={input} setInput={setInput} onSend={() => {setMessages([...messages, {text: input, sender: "user"}]); setInput("");}} />
        </div>
        <div className="results-half">
          <SearchResults plans={samplePlans} onRowClick={handleRowClick} />
        </div>
      </div>
    </main>
  );
}

export default Qna;
