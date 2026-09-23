function LoadingSpinner({ text = "Loading properties..." }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="spinner"></div>

      <p>{text}</p>
    </div>
  );
}

export default LoadingSpinner;