import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* wrap our route with AuthWrapper component */}
      <AuthWrapper>
        <Router>
          <Routes>
            <Route path='/' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </AuthWrapper>
    </div>
  );
}

export default App;
