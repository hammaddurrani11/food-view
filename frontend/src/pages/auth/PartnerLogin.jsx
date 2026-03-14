import React from 'react';
import '../../styles/theme.css';
import '../../styles/auth.css';

const PartnerLogin = () => {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="role-badge">Partner</span>
                <div className="auth-header">
                    <h1>Partner Portal</h1>
                    <p>Log in to manage your restaurant and orders</p>
                </div>
                
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">Business Email</label>
                        <input type="email" id="email" placeholder="restaurant@example.com" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" />
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
