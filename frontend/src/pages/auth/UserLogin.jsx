import React from 'react';
import '../../styles/theme.css';
import '../../styles/auth.css';

const UserLogin = () => {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="role-badge">User</span>
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to your account to order food</p>
                </div>
                
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="name@example.com" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" />
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
