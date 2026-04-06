import '../../styles/theme.css';
import '../../styles/auth.css';
import '../../styles/CreateFood.css';
import { useRef, useState } from 'react';
import axios from 'axios';

const CreateFood = () => {
    const videoRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        video: null
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            video: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('video', formData.video);

        const response = await axios.post('http://localhost:3000/api/food/', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(response.data);
    }

    return (
        <div className="auth-container">
            <div className="auth-card create-food-card">
                <div className="auth-header">
                    <h1>Create New Food</h1>
                    <p>Add a new dish to your menu with a short video</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Dish Name</label>
                        <input
                            name="name"
                            type="text"
                            id="name"
                            placeholder="Tasty Burger"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Describe your dish..."
                            rows="4"
                            className="form-input"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="video">Food Video (Reel)</label>
                        <input
                            name="video"
                            type="file"
                            id="video"
                            accept="video/*"
                            className="file-input"
                            onChange={handleFileChange}
                            ref={videoRef}
                        />
                        <p className="input-hint">Upload a short (15-30s) video of your food.</p>
                    </div>

                    <button type="submit" className="auth-button">Create Dish</button>
                </form>
            </div>
        </div>
    )
}

export default CreateFood