import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading, error }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/profile';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (err) {
                console.error('Failed to register:', err);
                setMessage(err?.data?.message || err.error || 'Registration failed');
            }
        }
    };

    return (
        <div className="min-h-screen bg-luxe-offwhite flex items-center justify-center pt-20 px-6 pb-12">
            <div className="w-full max-w-md bg-white p-10 shadow-sm border border-luxe-black/5 flex flex-col items-center">
                <h2 className="text-3xl font-playfair tracking-widest text-center mb-2">CREATE ACCOUNT</h2>
                <p className="text-center text-sm opacity-60 mb-8">Join LUXE to unlock exclusive benefits.</p>

                {message && <div className="text-red-500 text-sm text-center mb-4 w-full">{message}</div>}
                {error && !message && <div className="text-red-500 text-sm text-center mb-4 w-full">{error?.data?.message || error.error || 'Registration failed'}</div>}

                <form className="space-y-6 w-full" onSubmit={submitHandler}>
                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors placeholder:opacity-30"
                            placeholder="Jane Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors placeholder:opacity-30"
                            placeholder="jane@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors placeholder:opacity-30"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors placeholder:opacity-30"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full mt-8" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm opacity-70">
                    Already have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-semibold text-luxe-black hover:text-luxe-gold transition-colors">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
