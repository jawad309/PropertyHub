function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">

      <span className="search-icon">
        🔍
      </span>

      <input
        type="text"
        placeholder="Search by property, location or type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search properties"
      />

      {search && (
        <button
          type="button"
          className="search-clear"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}

      <button
        type="button"
        className="search-submit"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;