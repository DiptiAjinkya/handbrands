import React from 'react'
import "./post.css"
import { MoreVert } from "@material-ui/icons";
import { useEffect,useState } from 'react';

import axios from 'axios';
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';



 const Post=({post}) => { //this is imported in feed.js
    const [like , setLike]=useState(post.likes.length);
    const [isLiked , setIsLiked]=useState(false);
    const {user:currentUser}=useContext(AuthContext);
    const PF = `http://localhost:8800/Images/`;
     //console.log(PF);
    const [user , setUser]=useState([]);

    
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes]);
    
    useEffect(()=>{
        const fetchUser = async () =>{
            const res=await axios.get(`/users?userId=${post.userId}`);
            //console.log(res.data);
            setUser(res.data);
        };
        fetchUser();
        
    },[post.userId]);



    const likeHandler=()=>{
        try{
                axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
        }
        catch(err)
        {

        }

        setLike(isLiked? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    return (
        <div className='post'>
            <div className='postWrapper'>
              <div className='postTop'>
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img className='postProfileImg' 
                    src={user.profilePicture ? PF+user.profilePicture : PF+"default1.jpg" } 
                    alt="" />
                    </Link >
                     <span className="postUserName" >{user.username} </span>
                      <span className='postDate'>{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
              </div>
              <div className="postCenter">
                  <span className='postText'>{post?.desc}</span>
                  <img  className='postImg' src={PF+post.img} alt="" />
              </div>
              <div className="postBottom">
                  <div className="postBottomLeft">
                        
                      <img className='likeIcon' src={`${PF}heart.png`}  onClick={likeHandler} alt="" />  
                      <span className='postLikeCounter'> {like} People Like it</span>
                  </div>
                  <div className="postBottomRight">
                      <div className="postCommentText">{post.comment} Comments</div>
                  </div>
              </div>
            </div>
        </div>
    )
}

export default Post;