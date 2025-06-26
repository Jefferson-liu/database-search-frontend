import React from "react";
import "./QnaSidebarItem.css";

function QnaSidebarItem({ item, isSelected, onClick, onHover, onDelete }) {
  return (
    <div
      className={`qna-sidebar-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onMouseEnter={() => onHover(item.search_id)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="qna-sidebar-item-label" title={item.customer_name} >
        {item.customer_name.slice(0, 40) || "Untitled"}
      </span>
      <div className="qna-sidebar-item-actions">
        <button
          className="qna-sidebar-item-delete"
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering select
            onDelete(item.search_id);
          }}
          aria-label="Delete QnA"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default QnaSidebarItem;
