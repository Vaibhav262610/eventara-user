"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Community() {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const userId = "demo-user" // Replace with real user ID
    const maxCharCount = 280

    // Random gradient backgrounds for posts
    const gradients = [
        "bg-gradient-to-r from-pink-500 to-purple-500",
        "bg-gradient-to-r from-yellow-400 to-orange-500",
        "bg-gradient-to-r from-green-400 to-blue-500",
        "bg-gradient-to-r from-indigo-500 to-purple-600",
        "bg-gradient-to-r from-red-500 to-pink-500",
    ]

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            setIsLoading(true)
            const res = await fetch("/api/community")
            if (!res.ok) throw new Error("Failed to fetch posts")
            const data = await res.json()
            setPosts(data)
        } catch (err) {
            setError("Failed to load posts. Please try again later.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePost = async () => {
        if (!newPost.trim()) return

        try {
            setIsSubmitting(true)
            const res = await fetch("/api/community", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newPost, user: userId }),
            })

            if (!res.ok) throw new Error("Failed to create post")

            const data = await res.json()
            setPosts([data, ...posts])
            setNewPost("")
        } catch (err) {
            setError("Failed to create post. Please try again.")
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReaction = async (postId, action) => {
        try {
            await fetch("/api/posts", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, userId, action }),
            })

            setPosts(
                posts.map((post) =>
                    post._id === postId
                        ? {
                            ...post,
                            likes: action === "like" ? post.likes + 1 : post.likes,
                            dislikes: action === "dislike" ? post.dislikes + 1 : post.dislikes,
                        }
                        : post,
                ),
            )
        } catch (err) {
            setError(`Failed to ${action} post. Please try again.`)
            console.error(err)
        }
    }

    // Format relative time
    const formatTimeAgo = (dateString) => {
        if (!dateString) return "Just now"

        const date = new Date(dateString)
        const now = new Date()
        const seconds = Math.floor((now - date) / 1000)

        if (seconds < 60) return `${seconds}s ago`
        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return `${minutes}m ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`
        const days = Math.floor(hours / 24)
        if (days < 30) return `${days}d ago`
        const months = Math.floor(days / 30)
        return `${months}mo ago`
    }

    // Get random avatar for users
    const getAvatarUrl = (userId) => {
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
    }

    return (
        <div className="min-h-screen  mt-24  text-white">
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Community Vibes
                </h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <div className="mb-10 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl">
                    <div className="flex gap-4">
                        <div className="hidden sm:block">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                                {userId.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="What's on your mind? Share with the community..."
                                className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all resize-none h-24 placeholder-gray-400"
                                maxLength={maxCharCount}
                            />
                            <div className="flex justify-between items-center mt-3">
                                <span
                                    className={`text-sm ${newPost.length > maxCharCount * 0.8 ? "text-yellow-400" : "text-gray-400"}`}
                                >
                                    {newPost.length}/{maxCharCount}
                                </span>
                                <button
                                    onClick={handlePost}
                                    disabled={isSubmitting || !newPost.trim() || newPost.length > maxCharCount}
                                    className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all transform hover:scale-105 ${isSubmitting || !newPost.trim()
                                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-purple-500/30"
                                        }`}
                                >
                                    {isSubmitting ? "Posting..." : "Share"}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {isLoading ? (
                            // Custom loading skeletons
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700 animate-pulse">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                                        <div>
                                            <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                            <div className="h-3 w-16 bg-gray-700 rounded mt-2"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))
                        ) : posts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-10 border border-gray-700 text-center"
                            >
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-gray-400 text-lg">No posts yet. Be the first to share something!</p>
                            </motion.div>
                        ) : (
                            posts.map((post, index) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 opacity-10">
                                        <div className={`w-full h-full ${gradients[index % gradients.length]}`}></div>
                                    </div>
                                    <div className="relative bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all shadow-lg hover:shadow-xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <img
                                                src={post.userAvatar || getAvatarUrl(post.user || userId)}
                                                alt="User avatar"
                                                className="w-12 h-12 rounded-full border-2 border-gray-600"
                                            />
                                            <div>
                                                <p className="font-semibold text-lg">{post.userName || "Community Member"}</p>
                                                <p className="text-xs text-gray-400">{formatTimeAgo(post.createdAt)}</p>
                                            </div>
                                        </div>
                                        <p className="text-lg mb-6 whitespace-pre-wrap">{post.content}</p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleReaction(post._id, "like")}
                                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700/50 hover:bg-purple-600/50 transition-colors border border-gray-600 hover:border-purple-500"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                </svg>
                                                <span className="font-medium">{post.likes || 0}</span>
                                            </button>
                                            <button
                                                onClick={() => handleReaction(post._id, "dislike")}
                                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700/50 hover:bg-pink-600/50 transition-colors border border-gray-600 hover:border-pink-500"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                                                </svg>
                                                <span className="font-medium">{post.dislikes || 0}</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

