import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../serviecs/authService';

function Login(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            localStorage.setItem(
                'token',
                data.token
            );
            alert('Login Successful');
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                alert(
                    error.response.data.message
                );
            } else {
                alert('Something went wrong');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Login </h1>
                <form onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <button
                        type="submit"
                        className="w-full bg-yellow-200 text-teal font-bold py-2 rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;