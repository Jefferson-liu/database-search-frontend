import React from "react";
import "./SearchSidebarItem.css";

function SearchSidebarItem({ item, isSelected, onClick, onHover, onDelete }) {
  return (
    <div
      className={`search-sidebar-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onMouseEnter={() => onHover(item.search_id)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="search-sidebar-item-label" title={item.customer_name} >
        {item.customer_name.slice(0, 40) || "Untitled"}
      </span>
      <div className="search-sidebar-item-actions">
        <button
          className="search-sidebar-item-delete"
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering select
            onDelete(item.search_id);
          }}
          aria-label="Delete Search"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default SearchSidebarItem;
