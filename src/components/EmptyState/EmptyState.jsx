import "./EmptyState.css";

function EmptyState() {
  // This component is used to display an empty state when there are no QnA pairs available.
  return (
    <div className="empty-state">No QnA pairs available. Please add a new one.</div>
  );
}

export default EmptyState;