import React, { useState } from 'react';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', role: '', status: 'Active' });

    const handleAddUser = () => {
        if (!newUser.name || !newUser.role) return;
        const newId = Math.random();
        setUsers([...users, { id: newId, ...newUser }]);
        setNewUser({ name: '', role: '', status: 'Active' });
    };

    const handleStatusToggle = (id) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
        );
        setUsers(updatedUsers);
    };

    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-blue-100 to-blue-300">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="mb-4">
                <h2 className="text-xl mb-2">Add New User</h2>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={newUser.name} 
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input 
                    type="text" 
                    placeholder="Role" 
                    value={newUser.role} 
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button 
                    onClick={handleAddUser} 
                    className="bg-blue-500 text-white p-2"
                >
                    Add User
                </button>
            </div>

            <h2 className="text-xl mb-2">Users</h2>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">
                                <button 
                                    onClick={() => handleStatusToggle(user.id)} 
                                    className={`p-1 ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                                >
                                    {user.status}
                                </button>
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
