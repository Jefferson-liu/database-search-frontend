import { useEffect, useRef } from "react";
import "./ChatTextBox.css";

function ChatTextBox({ messages, input, setInput, onSend }) {
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView( );
    }, [messages]);
  return (
    <div className="chat-test-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`msg ${msg.sender}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent newline on Enter key
              onSend();
            }
          }}
          autoFocus
        />
        <button onClick={onSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatTextBox;
