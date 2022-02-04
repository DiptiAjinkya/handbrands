import React, { useContext } from 'react'

import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions, Cancel}  from "@material-ui/icons"// this take from material user interface
import { AuthContext } from '../../context/AuthContext'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Share= ()=>{        // This is Need TO import in feed.js
  
    const {user}=useContext(AuthContext)
    const PF= `http://localhost:8800/Images/`;
    const desc = useRef();
    //const img=useRef();
    const [file,setFile]=useState(null)
    const submitHandler = async(e)=>{
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc : desc.current.value,
            //img:img.current.value
       
        };

        if(file){
            const data= new FormData();
            const fileName=file.name;
            data.append("file",file);
            data.append("name",fileName);
            newPost.img = fileName;
            // console.log(newPost);
            

            try{
                await axios.post("/upload",file)
                .then((data)=>{
                    console.log("hi",data)
                })
                .catch((errr)=>{
                    console.log("err", errr)
                })
            }
            catch(err)
            {
                console.log(err)
            }
        }
        try{
           await axios.post("/posts",newPost);
           window.location.reload();

        }
        catch(err){

        }
    }

    return(
        <div className="share">
         <div className="shareWrapper">
          <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"default1.jpg"} alt="" /> 
              <input placeholder={"What is In Your Mind "+user.username +"?" } className="shareInput" ref={desc}/>
          </div>
          <hr className="shareHr"/>
          {file && (
              <div className="shareImgContainer">
                  <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                  <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
              </div>
          )}
          <form className="shareBottom" onSubmit ={submitHandler} >

               <div className="shareOptions">
                   <label htmlFor="file" className="shareOption">
                       <PermMedia htmlColor="tomato" className="shareIcon"/>
                       <span className="shareOptionText">Photo or Video</span>
                       <input style={{display:"none"}} type="file" id = "file" accept = ".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                   </label>
                   <div className="shareOption">
                       <Label htmlColor="blue" className="shareIcon"/>
                       <span className="shareOptionText">Tag</span>
                   </div>
                   <div className="shareOption">
                       <Room htmlColor="green" className="shareIcon"/>
                       <span className="shareOptionText">Locations</span>
                   </div>
                   <div className="shareOption">
                       <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                       <span className="shareOptionText">Fellings</span>
                   </div>

                   <button className="shareButton" type = "submit">Share</button>
               </div>
             
            </form>

            </div>

        </div>
    )
}

export default Share;
