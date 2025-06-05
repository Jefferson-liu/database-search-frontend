import React, { useEffect, useRef } from 'react';
import './TextInput.css';

const TextInput = ({ value, onChange, onSend, placeholder = "Type a message..." }) => {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '0px'; // reset height
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textareaRef, value]);

  return (
    <textarea
      ref={textareaRef}
      className="text-input-solo"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      rows={1}
    />
  );
};

export default TextInput;
