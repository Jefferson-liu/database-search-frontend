import "./GenerateButton.css";

function GenerateButton({ onClick }) {
  return (
    <button className="generate-button" onClick={onClick}>
      Generate Chatbot
    </button>
  );
}

export default GenerateButton;
