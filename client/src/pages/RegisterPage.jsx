import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
    const navigate = useNavigate();
    const { handleRegister } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill all fields.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setIsSubmitting(true);
            await handleRegister({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            navigate('/login');
        } catch (err) {
            const message =
                err?.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="max-w-md mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-2">Create account</h1>
            <p className="text-gray-600 mb-8">Start hosting or booking stays.</p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-1 font-medium">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={onChange}
                        className="input-field"
                        autoComplete="username"
                    />
                </div>

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
                        autoComplete="new-password"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={onChange}
                        className="input-field"
                        autoComplete="new-password"
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
                    {isSubmitting ? 'Creating account...' : 'Register'}
                </button>
            </form>

            <p className="mt-6 text-sm text-gray-700">
                Already have an account? <Link to="/login" className="text-airbnb-pink font-medium">Login</Link>
            </p>
        </main>
    );
}

export default RegisterPage;