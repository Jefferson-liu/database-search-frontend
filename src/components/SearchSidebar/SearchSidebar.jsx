import React, { useState } from "react";
import "./SearchSidebar.css";
import SearchSidebarItem from "../SearchSidebarItem/SearchSidebarItem";

function SearchSidebar({ searchList, selectedIndex, onSelect, onAdd, handleDelete, handleGoHome }) {
  const [hoveredId, setHoveredId] = useState(null);
  
  
  return (
    <aside className="search-sidebar">
      <div className="search-sidebar-list">
        {searchList.map((item, idx) => (
          <SearchSidebarItem
          key={item.search_id}
          item={item}
          isSelected={selectedIndex === idx}
          onClick={() => onSelect(idx)}
          onHover={setHoveredId}
          onDelete={handleDelete}
        />
        
        ))}
      </div>
      <button className="add-search-btn" onClick={onAdd}>
        + New Search
      </button>
    </aside>
  );
}

export default SearchSidebar;
