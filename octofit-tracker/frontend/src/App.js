import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navLinkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');

function HomePage() {
  const features = [
    { to: '/users',       icon: '👤', label: 'Users',       desc: 'Manage members'        },
    { to: '/teams',       icon: '🏆', label: 'Teams',       desc: 'Create & join teams'   },
    { to: '/activities',  icon: '🏃', label: 'Activities',  desc: 'Log your workouts'     },
    { to: '/workouts',    icon: '💪', label: 'Workouts',    desc: 'Browse workout plans'  },
    { to: '/leaderboard', icon: '📊', label: 'Leaderboard', desc: "See who's on top"      },
  ];

  return (
    <div className="card hero-card">
      <div className="hero-header text-center">
        <h1 className="display-5 fw-bold mb-3">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-4">
          Track activities, manage teams, and compete on the leaderboard.
        </p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <Link to="/activities" className="btn btn-primary px-4">Log Activity</Link>
          <Link to="/leaderboard" className="btn btn-outline-light px-4">View Leaderboard</Link>
        </div>
      </div>
      <div className="card-body py-4">
        <div className="row g-4 text-center">
          {features.map(({ to, icon, label, desc }) => (
            <div key={to} className="col-sm-6 col-md-4">
              <Link to={to} className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0 p-3">
                  <div className="feature-icon">{icon}</div>
                  <h5 className="fw-semibold mt-1 mb-1 text-dark">{label}</h5>
                  <p className="text-muted small mb-0">{desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg octofit-navbar px-3">
        <Link className="navbar-brand" to="/">&#127939; OctoFit Tracker</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className={navLinkClass} to="/users">Users</NavLink></li>
            <li className="nav-item"><NavLink className={navLinkClass} to="/teams">Teams</NavLink></li>
            <li className="nav-item"><NavLink className={navLinkClass} to="/activities">Activities</NavLink></li>
            <li className="nav-item"><NavLink className={navLinkClass} to="/workouts">Workouts</NavLink></li>
            <li className="nav-item"><NavLink className={navLinkClass} to="/leaderboard">Leaderboard</NavLink></li>
          </ul>
        </div>
      </nav>

      <div className="container page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
