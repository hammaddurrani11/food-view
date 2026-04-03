import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './BusinessProfile.css'

const BusinessProfile = () => {
    const { id, videoId } = useParams()
    const navigate = useNavigate()
    const [partner, setPartner] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [isReelsOpen, setIsReelsOpen] = useState(false)

    // Refs for the reels scroller and individual videos
    const scrollerRef = useRef(null)
    const videoRefs = useRef({})

    const fetchData = async () => {
        try {
            const [partnerRes, videosRes] = await Promise.all([
                axios.get(`http://localhost:3000/api/auth/food-partner/${id}`, { withCredentials: true }),
                axios.get(`http://localhost:3000/api/food?foodPartner=${id}`, { withCredentials: true })
            ])

            setPartner(partnerRes.data.foodPartner)
            setVideos(videosRes.data.foodItems)
        } catch (error) {
            console.error('Error fetching profile data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    // Handle Reels Overlay state based on videoId in URL
    useEffect(() => {
        if (videoId && videos.length > 0) {
            setIsReelsOpen(true)
            // Scroll to the specific video after a short delay to allow DOM to render
            setTimeout(() => {
                const target = videoRefs.current[videoId]
                if (target) {
                    target.scrollIntoView({ behavior: 'auto' })
                    // Play the target video
                    target.querySelector('video')?.play().catch(e => console.log("Autoplay blocked", e))
                }
            }, 100)
        } else {
            setIsReelsOpen(false)
        }
    }, [videoId, videos])

    const openReel = (vid) => {
        navigate(`/partner/${id}/reel/${vid}`)
    }

    const closeReels = () => {
        navigate(`/partner/${id}`)
    }

    // Intersection Observer to handle video playback on scroll
    useEffect(() => {
        if (!isReelsOpen) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const video = entry.target.querySelector('video')
                    if (entry.isIntersecting) {
                        video?.play().catch(e => console.log("Play failed", e))
                        // Update URL to current video ID as user scrolls
                        const vid = entry.target.dataset.vid
                        if (vid && vid !== videoId) {
                            navigate(`/partner/${id}/reel/${vid}`, { replace: true })
                        }
                    } else {
                        video?.pause()
                    }
                })
            },
            { threshold: 0.7 }
        )

        const elements = Object.values(videoRefs.current)
        elements.forEach(el => el && observer.observe(el))

        return () => {
            elements.forEach(el => el && observer.unobserve(el))
        }
    }, [isReelsOpen, videos])

    if (loading) {
        return <div className="profile-container" style={{ textAlign: 'center', paddingTop: '100px' }}>Loading Business Profile...</div>
    }

    if (!partner) {
        return <div className="profile-container" style={{ textAlign: 'center', paddingTop: '100px' }}>Business Partner not found.</div>
    }

    return (
        <div className="profile-container">
            {/* Instagram Style Header */}
            <header className="profile-header">
                <div className="profile-photo-container">
                    <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${partner.name}`}
                        alt={partner.name}
                        className="profile-photo"
                    />
                </div>
                <div className="profile-info">
                    <div className="profile-name-row">
                        <h1 className="profile-name">{partner.name}</h1>
                    </div>
                    <div className="profile-address">
                        <span className="profile-address-icon">📍</span>
                        {partner.address}
                    </div>
                    <div className="stats-container">
                        <h3 className="stats-heading">
                            Total Meals: <span className="stats-value">{videos.length} videos</span>
                        </h3>
                    </div>
                </div>
            </header>

            {/* Video Grid */}
            <div className="video-grid-container">
                <div className="video-grid">
                    {videos.map((video) => (
                        <div
                            key={video._id}
                            className="grid-item"
                            onClick={() => openReel(video._id)}
                        >
                            <video className="grid-video" src={video.video} muted />
                            <div className="grid-overlay">
                                <svg viewBox="0 0 24 24" className="play-icon-small">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reels Overlay */}
            {isReelsOpen && (
                <div className="reels-overlay">
                    <div className="reels-header">
                        <button className="close-btn" onClick={closeReels}>&times;</button>
                        <span>{partner.name} - Reels</span>
                    </div>
                    <div className="reels-scroller" ref={scrollerRef}>
                        {videos.map((video) => (
                            <div
                                key={video._id}
                                data-vid={video._id}
                                className="reel-item"
                                ref={el => videoRefs.current[video._id] = el}
                            >
                                <div className="reel-video-container">
                                    <video
                                        className="reel-video"
                                        src={video.video}
                                        loop
                                        playsInline
                                    />
                                    <div className="reel-info-overlay">
                                        <p className="reel-description">{video.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default BusinessProfile