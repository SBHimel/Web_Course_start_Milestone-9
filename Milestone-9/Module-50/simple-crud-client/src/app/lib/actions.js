
// delete er kaj korte 

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteUser = async(userId)=>{
    'use server';

    const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log('After DELETE',data);
    
    // TODO: Revalidate cache
    if(data.deletedCount > 0){
        revalidatePath('/users');
    }
    return data;
}


// Insert korar kaj kora 

export const createUser = async (formData) => {
    'use server';
    const newUser = Object.fromEntries(formData.entries());

    console.log('new user data', newUser);

    const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const data = await res.json();
    console.log('data after post', data);

    if(data.insertedId){
        revalidatePath('/users');
    }

    return data;
}

// Update er kaj action bananu

export const updateUser = async (userId, formData)=>{
    'use server';
    const updatedUser = Object.fromEntries(formData.entries());



    const res = await fetch(`http://localhost:5000/users/${userId}`,{
        method: 'PATCH',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    });
    const data = await res.json();
    console.log('after update', data);
    
    // TODO: revalidation
    if(data.modifiedCount > 0){
        revalidatePath('/users');
        redirect('/users')
    }

    return data;
}