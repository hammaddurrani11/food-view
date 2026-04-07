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
            });

            apiHelper(response.data, () => {
                setFoodItems(response.data.foodItems);
            });

        } catch (error) {
            console.error('Error fetching food items:', error);
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

    if (foodItems.length == 0) {
        return (
            <div className="reel-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: '#fff' }}>
                <p>There are no Food Items Listed at the moment.</p>
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