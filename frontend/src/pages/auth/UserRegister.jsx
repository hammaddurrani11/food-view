import '../../styles/theme.css';
import '../../styles/auth.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/user/register',
                formData,
                {
                    withCredentials: true
                });

            console.log("User Registered Successfully", response.data);
            navigate('/');
        } catch (error) {
            console.error("Registration error:", error);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="role-badge">User</span>
                <div className="auth-header">
                    <h1>Join Us</h1>
                    <p>Create an account to start ordering</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input name="fullName" type="text" id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input name="email" type="email" id="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className="auth-button">Create Account</button>
                </form>

                <div className="auth-footer">
                    Already have an account? <a href="/user/login">Log in</a>
                    <div className="auth-divider"><span>OR</span></div>
                    Are you a food partner? <a href="/food-partner/register">Partner Registration</a>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
