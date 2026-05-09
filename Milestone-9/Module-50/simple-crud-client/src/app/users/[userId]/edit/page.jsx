import { updateUser } from '@/app/lib/actions';
import { getUserById } from '@/app/lib/data';
import { Button, Input, Label, Modal, TextField } from '@heroui/react';
import React from 'react';

const UserEditPage = async({params}) => {
    const {userId} = await params;
    const user = await getUserById(userId);
    console.log('editng user', user);

    const updateUserWrapper = async(formData) =>{
      'use server';
      return updateUser(userId, formData);
    }

    return (
        <div>
            Editing User: {user.name}
            <div className='w-1/2 mx-auto'>
             <form action={updateUserWrapper}  className="flex flex-col gap-4">
                                <TextField className="w-full" name="name" defaultValue={user?.name} type="text">
                                  <Label>Name</Label>
                                  <Input placeholder="Enter your name" />
                                </TextField>
                                <TextField className="w-full" name="email"
                                defaultValue={user?.email} type="email">
                                  <Label>Email</Label>
                                  <Input placeholder="Enter your email" />
                                </TextField>
                                <TextField className="w-full" name="role"
                                defaultValue={user?.role}
                                 type="tel">
                                  <Label>Role</Label>
                                  <Input placeholder="Enter user role" />
                                </TextField>
            
                        
                                  <div className='flex'>
                                    <Button slot="close" variant="secondary">
                                    Cancel
                                  </Button>
                                  <Button type="submit" slot="close">Update User</Button>
                                  </div>
                                
            
                              </form>
            </div>
        </div>
    );
};

export default UserEditPage;