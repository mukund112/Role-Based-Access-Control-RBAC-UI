// src/App.js
import React from 'react';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';

function App() {
    return (
        <div className="App">
            <UserManagement />
            <RoleManagement />
        </div>
    );
}

export default App;
