import React from "react";
import "./SearchResults.css"; // Optional: for styling

const columns = [
  { key: "item_name", label: "Plan Name" },
  { key: "provider", label: "Provider" },
  { key: "region", label: "Region" },
  { key: "promotion_price", label: "Promo Price" },
  { key: "original_price", label: "Original Price" },
  { key: "data", label: "Data (GB)" },
  { key: "roaming", label: "Roaming" },
  { key: "free_ld", label: "Free LD" },
  { key: "activation_fee", label: "Activation Fee" },
  { key: "promo_start_date", label: "Start Date" },
];

export default function SearchResults({ plans = [], onRowClick }) {
  return (
    <div className="search-results-container">
      <table className="search-results-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, idx) => (
            <tr
              key={idx}
              className="search-results-row"
              onClick={() => onRowClick && onRowClick(plan)}
              style={{ cursor: "pointer" }}
            >
              {columns.map(col => (
                <td key={col.key}>
                  {col.key === "roaming"
                    ? plan.roaming?.join(", ")
                    : plan[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
