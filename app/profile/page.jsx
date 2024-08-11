'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`); 
            const data = await response.json();
            setPosts(data);
        };
        
        if(session?.user.id) fetchPosts();
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed) {
            try {
                fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE"
                });
                setPosts(posts.filter((p) => p._id !== post._id));
                alert("Prompt deleted successfully");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <Profile 
            name="My"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
