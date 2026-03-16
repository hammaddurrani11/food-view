import '../../styles/theme.css';
import '../../styles/auth.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const PartnerLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:3000/api/auth/food-partner/login', formData, {
            withCredentials: true
        })

        console.log('response', response.data);
        navigate('/');
    }
    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="role-badge">Partner</span>
                <div className="auth-header">
                    <h1>Partner Portal</h1>
                    <p>Log in to manage your restaurant and orders</p>
                </div>

                <form className="auth-form" onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Business Email</label>
                        <input type="email" id="email" name='email' value={formData.email} onChange={handleOnChange} placeholder="restaurant@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' value={formData.password} onChange={handleOnChange} placeholder="••••••••" />
                    </div>

                    <button type="submit" className="auth-button">Sign In</button>
                </form>

                <div className="auth-footer">
                    New partner? <a href="/food-partner/register">Register your business</a>
                    <div className="auth-divider"><span>OR</span></div>
                    Looking for food? <a href="/user/login">Order Now</a>
                </div>
            </div>
        </div>
    );
};

export default PartnerLogin;
