import React from 'react'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
//import "./Home.css";
import "./profile.css"


//import { useContext } from 'react';
//import { AuthContext } from '../../context/AuthContext';


export default function Profile() {
    //const {user}=useContext(AuthContext)
    const PF = `http://localhost:8800/Images/`;
    
    const username=useParams().username;

    const [user , setUser] = useState([]);

    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await axios.get(`/users?username=${username}`)
            console.log(res.data);
            setUser(res.data)
        };
        fetchUser();
        
    },[username])

    return (
        <>
        <Topbar/>
        <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                <img className="profileCoverImg" src={user.coverPicture ? PF+user.coverPicture : PF+"default.jpg"} alt=""/>
                <img className="profileUserImg" src={user.profilePicture ? PF+user.profilePicture : PF+"default1.jpg"} alt=""/> 
                
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
                </div>
            </div>
            <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
     </div>
        
        </div>
        
        </div>
        </>

    );
}
