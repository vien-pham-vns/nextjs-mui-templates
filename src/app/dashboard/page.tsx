import React from 'react';
import { logOut } from '../auth/login/actions';

const Dashboard: React.FC = async () => {
    return (
        <main>
            Vienda
            <form action={logOut}>
                <button type="submit">Logout</button>
            </form>
            <h1>Welcome!</h1>
            {/* <p>Your id: {me.user.id}</p> */}
        </main>
    );
};

export default Dashboard;
