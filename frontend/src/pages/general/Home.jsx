import { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import '../../styles/video-reel.css'

const Home = () => {
    const [foodItems, setFoodItems] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/food/', {
                withCredentials: true
            })
            if (response.data.foodItems && response.data.foodItems.length > 0) {
                setFoodItems(response.data.foodItems)
            } else {
                // Mock data if no backend items found to show the "WOW" effect
                setFoodItems([
                    {
                        _id: '1',
                        video: 'https://assets.mixkit.io/videos/preview/mixkit-fresh-vegetables-and-fruits-on-the-table-41221-large.mp4',
                        description: 'Delicious fresh salad with vibrant organic vegetables. Perfect for a healthy lunch!',
                        foodPartnerId: 'p1'
                    },
                    {
                        _id: '2',
                        video: 'https://assets.mixkit.io/videos/preview/mixkit-close-up-of-a-pizza-being-sliced-3058-large.mp4',
                        description: 'Wood-fired pizza with extra cheese and fresh basil. Experience the true taste of Italy.',
                        foodPartnerId: 'p2'
                    },
                    {
                        _id: '3',
                        video: 'https://assets.mixkit.io/videos/preview/mixkit-pouring-chocolate-on-a-stack-of-pancakes-41249-large.mp4',
                        description: 'Fluffy pancakes with rich chocolate glaze. The ultimate breakfast treat you deserve.',
                        foodPartnerId: 'p3'
                    }
                ])
            }
        } catch (error) {
            console.error('Error fetching food items:', error)
            // Mock data as fallback for demonstration
            setFoodItems([
                {
                    _id: '1',
                    video: 'https://assets.mixkit.io/videos/preview/mixkit-fresh-vegetables-and-fruits-on-the-table-41221-large.mp4',
                    description: 'Delicious fresh salad with vibrant organic vegetables. Perfect for a healthy lunch!',
                    foodPartnerId: 'p1'
                },
                {
                    _id: '2',
                    video: 'https://assets.mixkit.io/videos/preview/mixkit-close-up-of-a-pizza-being-sliced-3058-large.mp4',
                    description: 'Wood-fired pizza with extra cheese and fresh basil. Experience the true taste of Italy.',
                    foodPartnerId: 'p2'
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFoodItems()
    }, [])

    if (loading) {
        return (
            <div className="reel-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: '#fff' }}>
                <p>Loading premium reels...</p>
            </div>
        )
    }

    return (
        <div className="reel-container">
            {foodItems.map((item) => (
                <VideoCard
                    key={item._id}
                    videoSrc={item.video}
                    description={item.description}
                    partnerId={item.foodPartner || item.foodPartnerId}
                />
            ))}
        </div>
    )
}

export default Home