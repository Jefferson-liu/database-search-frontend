import "./EmptyState.css";

function EmptyState() {
  // This component is used to display an empty state when there are no QnA pairs available.
  return (
    <div className="empty-state">No searches available. Please add a new one.</div>
  );
}

export default EmptyState;