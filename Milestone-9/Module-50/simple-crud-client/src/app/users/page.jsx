import React from 'react';
import {getUsers} from '../lib/data.js'
import UsersTable from '../components/UsersTable.jsx';
import { createUser, deleteUser } from '../lib/actions.js';
import AddUserModal from '../components/AddUserModal.jsx';

 const UsersPage = async() => {
    const users = await getUsers();

    return (
        <div>
            <div className='flex justify-between'>
            <h2>Users Management: {users.length}</h2>
            <AddUserModal createUserAction = {createUser}> </AddUserModal>
            </div>

            <UsersTable users={users} deleteUserAction = {deleteUser}></UsersTable>
        </div>
    );
};

export default UsersPage;