import '../../styles/theme.css';
import '../../styles/auth.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: [e.target.value]
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:3000/api/auth/user/login', formData, {
            withCredentials: true
        })

        console.log('response', response.data);
        navigate('/');
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="role-badge">User</span>
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your account to order food</p>
                </div>

                <form className="auth-form" onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name='email' value={formData.email} onChange={handleOnChange} placeholder="name@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' value={formData.password} onChange={handleOnChange} placeholder="••••••••" />
                    </div>

                    <button type="submit" className="auth-button">Sign In</button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <a href="/user/register">Create one</a>
                    <div className="auth-divider"><span>OR</span></div>
                    Are you a food partner? <a href="/food-partner/login">Partner Login</a>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
