import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
    console.log('Activities: fetching from', endpoint);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card data-card">
      <div className="card-header">
        <h4>&#127939; Activities</h4>
        {!loading && !error && (
          <span className="badge bg-light text-dark">{activities.length} record{activities.length !== 1 ? 's' : ''}</span>
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
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Distance (km)</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">No activities found.</td>
                  </tr>
                ) : (
                  activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.user}</td>
                      <td><span className="badge bg-secondary">{activity.type}</span></td>
                      <td>{activity.duration}</td>
                      <td>{activity.distance}</td>
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
          Showing {activities.length} activit{activities.length !== 1 ? 'ies' : 'y'}
        </div>
      )}
    </div>
  );
}

export default Activities;
