import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function rankClass(rank) {
  if (rank === 1) return 'rank-badge rank-1';
  if (rank === 2) return 'rank-badge rank-2';
  if (rank === 3) return 'rank-badge rank-3';
  return 'rank-badge rank-other';
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE}/api/leaderboard/`;
    console.log('Leaderboard: fetching from', endpoint);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card data-card">
      <div className="card-header">
        <h4>&#128202; Leaderboard</h4>
        {!loading && !error && (
          <span className="badge bg-light text-dark">{entries.length} team{entries.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3">
            <strong>Error:</strong> {error}
          </div>
        )}
        {loading ? (
          <div className="spinner-overlay">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Rank</th>
                  <th>Team</th>
                  <th style={{ width: '120px' }}>Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">No leaderboard data found.</td>
                  </tr>
                ) : (
                  entries.map((entry, index) => (
                    <tr key={entry.id}>
                      <td className="text-center">
                        <span className={rankClass(index + 1)}>{index + 1}</span>
                      </td>
                      <td className="fw-semibold">{entry.team}</td>
                      <td>
                        <span className="badge bg-primary fs-6">{entry.points}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !error && (
        <div className="card-footer">
          Showing {entries.length} team{entries.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
