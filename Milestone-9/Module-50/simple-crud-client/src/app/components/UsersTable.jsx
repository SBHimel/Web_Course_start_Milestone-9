import React from 'react';
import { Button, Table } from "@heroui/react";
import Link from 'next/link';

const UsersTable = ({ users }) => {
    return (
        <div>
            <Table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Team members"
                        className="min-w-[600px] bg-white"
                    >
                        {/* Header */}
                        <Table.Header className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                            <Table.Column isRowHeader className="px-4 py-3 text-left">
                                Name
                            </Table.Column>
                            <Table.Column className="px-4 py-3 text-left">
                                Email
                            </Table.Column>
                            <Table.Column className="px-4 py-3 text-left">
                                Role
                            </Table.Column>
                            <Table.Column className="px-4 py-3 text-left">
                                Actions
                            </Table.Column>
                        </Table.Header>

                        {/* Body */}
                        <Table.Body className="text-sm text-gray-700">

                            {
                                users.map(user => <Table.Row key={user._id} className="border-t hover:bg-gray-50 transition">
                                <Table.Cell className="px-4 py-3 font-medium text-gray-900">
                                    {user.name}
                                </Table.Cell>
                                <Table.Cell className="px-4 py-3 text-black">{user.email}</Table.Cell>
                                <Table.Cell className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                        {user.role}
                                    </span>
                                </Table.Cell>
                                <Table.Cell className="px-4 py-3 text-blue-600">
                                    <Link href={`/user/${user._id}`}><Button variant='outline'>Details</Button></Link>

                                    <Link href={`/user/${user._id}`}><Button variant='outline'>Edit</Button></Link>
                                    <Link href={`/user/${user._id}`}><Button variant='danger'>Details</Button></Link>
                                </Table.Cell>
                            </Table.Row>)
                            }

                            


                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );

};

export default UsersTable;