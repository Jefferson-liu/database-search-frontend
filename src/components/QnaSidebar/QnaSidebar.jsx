import React, { useState } from "react";
import "./QnaSidebar.css";
import QnaSidebarItem from "../QnaSidebarItem/QnaSidebarItem";

function QnaSidebar({ qnaList, selectedIndex, onSelect, onAdd, handleDelete, handleGoHome }) {
  const [hoveredId, setHoveredId] = useState(null);
  
  
  return (
    <aside className="qna-sidebar">
      <div className="qna-sidebar-list">
        {qnaList.map((item, idx) => (
          <QnaSidebarItem
          key={item.search_id}
          item={item}
          isSelected={selectedIndex === idx}
          onClick={() => onSelect(idx)}
          onHover={setHoveredId}
          onDelete={handleDelete}
        />
        
        ))}
      </div>
      <button className="add-qna-btn" onClick={onAdd}>
        + New Search
      </button>
    </aside>
  );
}

export default QnaSidebar;
