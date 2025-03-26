import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    userActions: { type: Map, of: String, default: {} }, // Stores user reactions (like/dislike)
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
