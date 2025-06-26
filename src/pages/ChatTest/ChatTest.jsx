import { useState } from "react";
import ChatTextBox from "../../components/ChatTextBox/ChatTextBox";
import GenerateButton from "../../components/GenerateButton/GenerateButton";
import "./ChatTest.css";

function ChatTest() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { hasEmbeddings, loading: loadingHasEmbeddings, error: errorHasEmbeddings, refetch } = useGetHasEmbeddings();
  const { addEmbeddings, loading: loadingAddAllEmbeddings, error: errorAddAllEmbeddings } = useAddAllEmbeddings();
  const { fetchBotResponse, loading: loadingBotResponse, error: errorBotResponse } = useGetBotResponse();
  const { triggerBuild, loading: loadingBuiildFaissIndex, error: errorBuildFaissIndex } = useBuildFaissIndex();
  const { refreshIndexStatus, hasIndex, loading: loadingCheckHasIndex, error: errorCheckHasIndex } = useCheckHasIndex();


  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const response = await fetchBotResponse(input);
    console.log("Bot response:", response);
    setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    setInput("");
  };

  const handleGenerate = async () => {
    try {
      await addEmbeddings();      // wait until it's done
      await triggerBuild();       // then build FAISS index
      refreshIndexStatus();        // then refresh index status
    } catch (err) {
      console.error("Failed during generation pipeline:", err);
      // optionally show error message
    }
  };



  return (
    <div className="chat-test-container">
      {!hasIndex ? (
        <GenerateButton onClick={handleGenerate} />
      ) : (
        <>
          <h2>Botname goes here</h2>
          <div className="chat-test-box">
            <ChatTextBox
              messages={messages}
              input={input}
              setInput={setInput}
              onSend={sendMessage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatTest;
