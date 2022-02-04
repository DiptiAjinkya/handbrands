import  React, { useContext } from 'react'
import "./Topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Topbar =()=>{
const {user}=useContext(AuthContext)
const PF=`http://localhost:8800/Images/`;
    return(
        <>
        <div className="topbarContainer">
        <div className="topbarLeftlogo">
        
        <span>
        <Link to = "/" style = {{textDecoration:"none"}}>
            <img src="/assets/Images/logo.jpg" alt="" className="logoImg" />
            </Link> 
            </span>
           
        </div>
        <div className="topbarLeft">
        
            <span className="Logo">HANDYBRANDS</span>
            
        </div>
        <div class="dropdown">
  <button class="dropbtn">Category &nbsp;
  <i class="fa fa-caret-down"></i></button>
  <div class="dropdown-content">
      <ul>
    <li><a  tabindex="-1" href="#">Male</a>
    <ul>
    <li><a tabindex="-1" href="#">Male</a></li>
    <li><a tabindex="-1" href="#">Female</a></li>
    </ul>
    </li>
    <li><a tabindex="-1" href="#">Female</a></li>
    </ul>
    
  </div>
</div>
        
       
        <div className="topbarCenter">
            <div className="searchbar">
            <Search className="searchIcon"/>
            <input placeholder="Search Product" className="searchInput"/>
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
            <Link to={"/login"}>
            <div className="topbarIcon">
            
                   Login 
                             
                </div>
                </Link>
                
                
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">3</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+user.profilePicture :PF+"default1.jpg"} alt="" className="topbarImg" />
            </Link>
        </div>
     </div>
        </>
    )
}
export default Topbar;