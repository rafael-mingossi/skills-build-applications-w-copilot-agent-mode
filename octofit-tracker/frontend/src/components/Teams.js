import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';
    console.log('Teams: fetching from', endpoint);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card data-card">
      <div className="card-header">
        <h4>&#127942; Teams</h4>
        {!loading && !error && (
          <span className="badge bg-light text-dark">{teams.length} team{teams.length !== 1 ? 's' : ''}</span>
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
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center text-muted py-4">No teams found.</td>
                  </tr>
                ) : (
                  teams.map((team) => (
                    <tr key={team.id}>
                      <td className="text-muted">{team.id}</td>
                      <td className="fw-semibold">{team.name}</td>
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
          Showing {teams.length} team{teams.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default Teams;
