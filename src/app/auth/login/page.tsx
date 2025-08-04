import { LoginForm } from './_components/LoginForm';

interface LoginPageProps {
    searchParams: Promise<{ token?: string }>;
}

const LoginPage: React.FC<LoginPageProps> = async () => {
    return <LoginForm mode="signin" />;
};

export default LoginPage;
