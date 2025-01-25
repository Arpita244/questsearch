import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: { query, page },
      });
      setResults(response.data.results);
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  useEffect(() => {
    if (query || page >= 1) {
      handleSearch();
    }
  }, [query, page]); // Trigger search whenever query or page changes

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query on input change
      />
      <button onClick={handleSearch}>Search</button>
      
      {loading && <p>Loading...</p>}
      <table className="results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((question, index) => (
              <tr key={index}>
                <td>{index + 1 + (page - 1) * 10}</td>
                <td>{question.title}</td>
                <td>{question.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-results">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default App;
