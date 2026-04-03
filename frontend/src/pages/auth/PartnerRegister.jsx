import '../../styles/theme.css';
import '../../styles/auth.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        contactName: '',
        phone: '',
        address: '',
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

        const response = await axios.post('http://localhost:3000/api/auth/food-partner/register', formData, {
            withCredentials: true
        })

        console.log('response', response.data);
        navigate('/create-food');
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="role-badge">Partner</span>
                <div className="auth-header">
                    <h1>Register Business</h1>
                    <p>Start selling your delicious food today</p>
                </div>

                <form className="auth-form" onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="restaurantName">Restaurant Name</label>
                        <input type="text" id="restaurantName" name='name' value={formData.name} onChange={handleOnChange} placeholder="Tasty Bites" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactName">Contact Name</label>
                        <input type="text" id="contactName" name='contactName' value={formData.contactName} onChange={handleOnChange} placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name='phone' value={formData.phone} onChange={handleOnChange} placeholder="+1 (555) 000-0000" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Business Address</label>
                        <input type="text" id="address" name='address' value={formData.address} onChange={handleOnChange} placeholder="123 Food Street, City, ZIP" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Business Email</label>
                        <input type="email" id="email" name='email' value={formData.email} onChange={handleOnChange} placeholder="restaurant@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' value={formData.password} onChange={handleOnChange} placeholder="••••••••" />
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
