import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading, error }] = useLoginMutation();

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
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };

    return (
        <div className="min-h-screen bg-luxe-offwhite flex items-center justify-center pt-20 px-6">
            <div className="w-full max-w-md bg-white p-10 shadow-sm border border-luxe-black/5">
                <h2 className="text-3xl font-playfair tracking-widest text-center mb-2">WELCOME BACK</h2>
                <p className="text-center text-sm opacity-60 mb-8">Enter your details to access your account.</p>

                {error && <div className="text-red-500 text-sm text-center mb-4">{error?.data?.message || error.error || 'Login failed'}</div>}

                <form className="space-y-6" onSubmit={submitHandler}>
                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors placeholder:opacity-30"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold tracking-widest uppercase">Password</label>
                            <a href="#" className="text-xs opacity-60 hover:text-luxe-gold transition-colors">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors placeholder:opacity-30"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full mt-8" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm opacity-70">
                    New to LUXE?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-semibold text-luxe-black hover:text-luxe-gold transition-colors">
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
