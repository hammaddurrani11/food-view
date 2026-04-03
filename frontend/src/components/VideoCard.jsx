import { useEffect, useRef, useState } from 'react'
import '../styles/video-reel.css'

const VideoCard = ({ videoSrc, description, partnerId }) => {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(e => console.error("Auto-play failed:", e))
                        setIsPlaying(true)
                    } else {
                        videoRef.current.pause()
                        setIsPlaying(false)
                    }
                })
            },
            { threshold: 0.7 } // Trigger when 70% of the video is visible
        )

        if (videoRef.current) {
            observer.observe(videoRef.current)
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current)
            }
        }
    }, [])

    const handleVideoPress = () => {
        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    return (
        <div className="video-card" onClick={handleVideoPress}>
            <video
                ref={videoRef}
                className="video-element"
                src={videoSrc}
                loop
                muted
                playsInline
                preload='metadata'
            />

            {!isPlaying && (
                <div className="play-button-overlay">
                    <div className="play-icon"></div>
                </div>
            )}

            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                <p className="description-text">
                    {description || "No description provided."}
                </p>
                <a
                    href={`/partner/${partnerId}`}
                    className="visit-store-btn"
                    onClick={(e) => e.stopPropagation()}
                >
                    Visit Store
                </a>
            </div>
        </div>
    )
}

export default VideoCard
