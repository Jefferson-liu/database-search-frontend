import { useEffect, useRef, useState } from "react";
import useAutosaveWebhook from "../../hooks/useAutosaveWebhook";
import ChatTextBox from "../ChatTextBox/ChatTextBox";
import SearchResults from "../SearchResults/SearchResults";
import useSendMessage from "../../hooks/useSendMessage";
import "./Search.css";

function Search({ search, onChange }) {
  const headerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { send, loading, error } = useSendMessage();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(search?.messages || []);
  const [searchResultIndex, setSearchResultIndex] = useState(35);
  const handleRowClick = () => {
    console.log("Row clicked");
  };

  const handleMessageClick = (msgId) => {
    console.log("Message clicked:", msgId);
    setSearchResultIndex(msgId);
    console.log("Search Result Index:", searchResultIndex);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages
    const newMessage = { id: messages.length + 1, text: input, direction: "incoming" };
    setMessages([...messages, newMessage]);
    setInput(""); // Clear input after sending
    const response = await send({ user_id: 1 , search_id: search.search_id, text: input });
    if (response && response.data) {
      const botMessage = { id: messages.length + 2, text: response.data["followup"], direction: "outgoing" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      console.error("Failed to send message:", error);
    }

  }

  const searchData = {
    customer_name: search?.customer_name ?? "",
    messages: search?.messages ?? [],
    plans: search?.plans ?? [],
  };


  useEffect(() => {
    if (headerRef.current) {
      const val = searchData.customer_name || "";
      headerRef.current.textContent = val;
      if (val === "") {
        headerRef.current.blur(); // this ensures :not(:focus):empty triggers
      }
    }
  }, [search]);

  const handleHeaderInput = (e) => {
    const content = e.currentTarget.textContent.trim();
    onChange("customer_name", content);
  };

  // Autosave when customer_name changes
  useAutosaveWebhook(search);

  // Send message when input is submitted


  return (
    <main className="search-editor-content">
      <div className={`search-question-header ${isFocused ? "focused" : ""}`}>
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
          <ChatTextBox messages={messages} input={input} setInput={setInput} onSend={handleSendMessage} handleMessageClick={handleMessageClick}/>
        </div>
        <div className="results-half">
          <SearchResults plans={searchData.plans[searchResultIndex]} onRowClick={handleRowClick} />
        </div>
      </div>
    </main>
  );
}

export default Search;
