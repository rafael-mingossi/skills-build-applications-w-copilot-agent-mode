import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/';
    console.log('Users: fetching from', endpoint);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card data-card">
      <div className="card-header">
        <h4>&#128100; Users</h4>
        {!loading && !error && (
          <span className="badge bg-light text-dark">{users.length} user{users.length !== 1 ? 's' : ''}</span>
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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-semibold">{user.username}</td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                      </td>
                      <td>
                        {user.team !== null && user.team !== undefined
                          ? <span className="badge bg-info text-dark">{user.team}</span>
                          : <span className="text-muted">—</span>}
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
          Showing {users.length} user{users.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default Users;
