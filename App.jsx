import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import JobAndApplicationDetailForm from './pages/JobAndApplicationDetailForm';
import ScheduledJobsTable from './pages/ScheduledJobsTable';
import JobRunStatus from './pages/JobRunStatus';
import LoginForm from './pages/LoginForm';
import Settings from './pages/Settings';
import Header from './pages/Header';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [jobs, setJobs] = useState([]);
  const [statuses, setStatuses] = useState([]);
useEffect(() => {
  const storedUser = sessionStorage.getItem('username');
  if (storedUser) {
    setUsername(storedUser);
    setIsLoggedIn(true);
  }
}, []);

const handleLogin = (user) => {
  setUsername(user);
  setIsLoggedIn(true);
  sessionStorage.setItem('username', user);
};

const handleLogout = () => {
  setUsername('');
  setIsLoggedIn(false);
  sessionStorage.removeItem('username');
};

  const handleSchedule = (job) => {
    setJobs([...jobs, job]);
    setStatuses([...statuses, { job: job.jobName, status: 'Scheduled', lastRun: 'N/A' }]);
  };
   // if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;
  return (
    <Router>
          {!isLoggedIn ? (
      <LoginForm onLogin={handleLogin} />
    ) : (

      <div className="app-container">
        <Header username={username} onLogout={handleLogout} />
        <div className="main-content">
          <nav className="sidebar">
              <h3>Crave API Schedular</h3>
            <ul>
              <li ><Link to="/" className="menu-link">  <span className="icon">📅</span> Schedule Job</Link></li>
              <li><Link to="/jobdetail" className="menu-link"> <span className="icon">📄</span> Job Detail</Link></li>
              <li><Link to="/jobrun" className="menu-link">  <span className="icon">🔁</span>Job Runs</Link></li>
              <li><Link to="/settings" className="menu-link"> <span className="icon">⚙️</span> Settings</Link></li>
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route path="/" element={<JobAndApplicationDetailForm  onSchedule={handleSchedule}  />} />
              <Route path="/jobdetail" element={<ScheduledJobsTable jobs={jobs} />} />
              <Route path="/jobrun" element={ <JobRunStatus statuses={statuses} />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
        )}
    </Router>
  );
}

export default App;
