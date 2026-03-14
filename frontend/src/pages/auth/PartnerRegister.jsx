import React from 'react';
import '../../styles/theme.css';
import '../../styles/auth.css';

const PartnerRegister = () => {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="role-badge">Partner</span>
                <div className="auth-header">
                    <h1>Register Business</h1>
                    <p>Start selling your delicious food today</p>
                </div>
                
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="restaurantName">Restaurant Name</label>
                        <input type="text" id="restaurantName" placeholder="Tasty Bites" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactName">Contact Name</label>
                        <input type="text" id="contactName" placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+1 (555) 000-0000" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Business Address</label>
                        <input type="text" id="address" placeholder="123 Food Street, City, ZIP" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Business Email</label>
                        <input type="email" id="email" placeholder="restaurant@example.com" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" />
                    </div>
                    
                    <button type="submit" className="auth-button">Apply Now</button>
                </form>
                
                <div className="auth-footer">
                    Already registered? <a href="/food-partner/login">Log in here</a>
                    <div className="auth-divider"><span>OR</span></div>
                    Looking for food? <a href="/user/register">Order Now</a>
                </div>
            </div>
        </div>
    );
};

export default PartnerRegister;
