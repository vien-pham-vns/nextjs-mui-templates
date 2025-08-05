import React from 'react';
import { logOut } from '../auth/login/actions';
import Form from 'next/form';
import { fetchUser } from './actions';

const Dashboard: React.FC = async () => {
    const directusUser = await fetchUser();

    return (
        <main>
            Vienda
            <Form action={logOut}>
                <button type="submit">Logout</button>
            </Form>
            <h1>Welcome!</h1>
            <p>Your id: {directusUser?.id || 'No user found'}</p>
        </main>
    );
};

export default Dashboard;
