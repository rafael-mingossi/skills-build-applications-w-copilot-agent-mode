import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';
    console.log('Workouts: fetching from', endpoint);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card data-card">
      <div className="card-header">
        <h4>&#128170; Workouts</h4>
        {!loading && !error && (
          <span className="badge bg-light text-dark">{workouts.length} workout{workouts.length !== 1 ? 's' : ''}</span>
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
                  <th style={{ width: '200px' }}>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center text-muted py-4">No workouts found.</td>
                  </tr>
                ) : (
                  workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td className="fw-semibold">{workout.name}</td>
                      <td className="text-muted">{workout.description}</td>
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
          Showing {workouts.length} workout{workouts.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default Workouts;
