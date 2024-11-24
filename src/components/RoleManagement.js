import React, { useState } from 'react';

function RoleManagement() {
    // State to store roles and permissions
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
        { id: 2, name: 'User', permissions: ['Read'] },
    ]);
    const [newRole, setNewRole] = useState({ name: '', permissions: [] });
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [editingRoleData, setEditingRoleData] = useState({ name: '', permissions: [] });

    // Add a new role
    const handleAddRole = () => {
        if (!newRole.name) return; // Don't add empty roles

        const newId = Math.random(); // Generate a unique ID for the new role
        setRoles([...roles, { id: newId, ...newRole }]);
        setNewRole({ name: '', permissions: [] }); // Reset new role form
    };

    // Edit an existing role
    const handleEditRole = (id) => {
        const roleToEdit = roles.find(role => role.id === id);
        setEditingRoleId(id);
        setEditingRoleData({ ...roleToEdit }); // Pre-fill form with the selected role's data
    };

    // Save edited role
    const handleSaveEdit = () => {
        const updatedRoles = roles.map(role =>
            role.id === editingRoleId ? { ...role, ...editingRoleData } : role
        );
        setRoles(updatedRoles);
        setEditingRoleId(null); // Clear editing mode
        setEditingRoleData({ name: '', permissions: [] }); // Reset form
    };

    // Delete a role
    const handleDeleteRole = (id) => {
        const updatedRoles = roles.filter(role => role.id !== id);
        setRoles(updatedRoles);
    };

    // Handle permission changes
    const handlePermissionChange = (permission) => {
        const updatedPermissions = newRole.permissions.includes(permission)
            ? newRole.permissions.filter(p => p !== permission)
            : [...newRole.permissions, permission];
        
        // If editing an existing role, update permissions for that role
        if (editingRoleId) {
            setEditingRoleData({
                ...editingRoleData,
                permissions: updatedPermissions
            });
        } else {
            setNewRole({
                ...newRole,
                permissions: updatedPermissions
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Role Management</h1>

            {/* Role Form (Add/Edit Role) */}
            <div className="mb-4">
                <h2 className="text-xl mb-2">{editingRoleId ? 'Edit Role' : 'Add New Role'}</h2>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Role Name" 
                    value={editingRoleId ? editingRoleData.name : newRole.name} 
                    onChange={(e) => {
                        const { name, value } = e.target;
                        if (editingRoleId) {
                            setEditingRoleData({ ...editingRoleData, [name]: value });
                        } else {
                            setNewRole({ ...newRole, [name]: value });
                        }
                    }} 
                    className="border p-2 mr-2" 
                />
                <div className="mb-2">
                    <h3 className="font-semibold">Permissions:</h3>
                    <div>
                        {['Read', 'Write', 'Delete'].map(permission => (
                            <label key={permission} className="mr-2">
                                <input 
                                    type="checkbox" 
                                    checked={newRole.permissions.includes(permission) || (editingRoleData.permissions && editingRoleData.permissions.includes(permission))} 
                                    onChange={() => handlePermissionChange(permission)} 
                                />
                                {permission}
                            </label>
                        ))}
                    </div>
                </div>
                <button 
                    onClick={editingRoleId ? handleSaveEdit : handleAddRole} 
                    className="bg-blue-500 text-white p-2"
                >
                    {editingRoleId ? 'Save Edit' : 'Add Role'}
                </button>
            </div>

            {/* List of Roles */}
            <h2 className="text-xl mb-2">Roles</h2>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Permissions</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <td className="border p-2">{role.id}</td>
                            <td className="border p-2">{role.name}</td>
                            <td className="border p-2">{role.permissions.join(', ')}</td>
                            <td className="border p-2">
                                <button onClick={() => handleEditRole(role.id)} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
                                <button onClick={() => handleDeleteRole(role.id)} className="bg-red-500 text-white p-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RoleManagement;
