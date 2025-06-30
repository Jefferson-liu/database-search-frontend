import { useEffect, useRef } from "react";
import "./ChatTextBox.css";

function ChatTextBox({ messages, input, setInput, onSend, handleMessageClick }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);
  const sortedMessages = messages.slice().sort((a, b) => a.id - b.id);


  return (
    <div className="chat-container">
      <div className="chat-box">
        {sortedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`msg ${msg.direction}`}
            onClick={msg.direction === "outgoing" ? () => handleMessageClick(msg.id) : undefined}
            style={{ cursor: msg.direction === "outgoing" ? "pointer" : "default" }}
          >
            <span>{msg.content}</span>
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
