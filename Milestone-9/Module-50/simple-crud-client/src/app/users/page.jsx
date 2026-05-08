import React from 'react';
import {getUsers} from '../lib/data.js'
import UsersTable from '../components/UsersTable.jsx';

 const UsersPage = async() => {
    const users = await getUsers();

    return (
        <div>
            <h2>Users Management: {users.length}</h2>
            <UsersTable users={users}></UsersTable>
        </div>
    );
};

export default UsersPage;