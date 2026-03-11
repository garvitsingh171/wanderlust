import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    function onChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function onSubmit(event) {
        event.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please enter email and password.');
            return;
        }

        try {
            setIsSubmitting(true);
            await handleLogin(formData);
            navigate('/');
        } catch (err) {
            const message =
                err?.response?.data?.message || 'Login failed. Please try again.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="max-w-md mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-600 mb-8">Login to continue.</p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        className="input-field"
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={onChange}
                        className="input-field"
                        autoComplete="current-password"
                    />
                </div>

                {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="mt-6 text-sm text-gray-700">
                New here? <Link to="/register" className="text-airbnb-pink font-medium">Create an account</Link>
            </p>
        </main>
    );
}

export default LoginPage;