import { connectDb } from "@/db/db";
import Post from "@/models/Post";
import { ObjectId } from "mongodb";

export async function GET() {
    try {
        await connectDb();
        const posts = await Post.find({});
        return Response.json(posts);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDb();
        const { content, user } = await req.json();
        const newPost = new Post({ content, user, likes: 0, dislikes: 0, userActions: {} });
        await newPost.save();
        return Response.json(newPost);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await connectDb();
        const { postId, userId, action } = await req.json();
        const post = await Post.findById(postId);
        if (!post) return Response.json({ error: "Post not found" }, { status: 404 });

        if (action === "like" && post.userActions[userId] !== "like") {
            post.likes += 1;
            post.userActions[userId] = "like";
        } else if (action === "dislike" && post.userActions[userId] !== "dislike") {
            post.dislikes += 1;
            post.userActions[userId] = "dislike";
        } else {
            return Response.json({ message: "Already reacted" });
        }

        await post.save();
        return Response.json({ message: "Updated successfully" });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}