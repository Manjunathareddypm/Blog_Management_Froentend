

import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import imageLogo from '../assest/logo_blogger_40px_2x.png'
import { setAuthenticated } from '../redux/Slice/Authentications';
import { addTokenToSystem } from '../redux/Slice/Authentications';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import './Header.css'
import MiniDrawer from '../Drawer/drawer';
import { useNavigate } from 'react-router-dom';
import imageOfAccountIcon from '../assest/logout.png'
import { useDispatch } from 'react-redux';
function Header(props) {
    const [drawer, setDrawer] = React.useState(false)
    const dispatch = useDispatch()
    const navigte = useNavigate()
    const listenToHeader = () => {
        setDrawer(!drawer)
    }
    const takeToCreatenewPost = () => {
        navigte("/createPost")
    }

    const onClickOnDashBoard = () =>{
        navigte("/dashboard")
    }

    const clickedOnLogout = async() => {
        localStorage.clear()
        dispatch(setAuthenticated(false))
        
        //dispatch(addTokenToSystem(null))
      }
    
    return (
        <>
            <div className='header-main'>
            <div className='menu-blogimg-dashboard-buttons'>
                <div className='meun-icn' onClick={listenToHeader}><MenuIcon /></div>
                <img src={imageLogo} className='img-logo-blog' height={"25px"} />
                <Button onClick={onClickOnDashBoard} style={{color:'orange',marginRight:'10px'}}>Dashboard</Button>
                </div>
                <div className='Createbutton-logoutimg'>
                <div onClick={takeToCreatenewPost} className='rgt-icon-header'>
                  {props.propValue ?<div ></div>  :  <Button style={{color:'orange'}} className='addIcnBlock'><AddIcon style={{ marginLeft: '0px' }} /> NEW POST</Button>}
                </div>
                <div onClick={clickedOnLogout} className='account-icon'><img src={imageOfAccountIcon} height={'28px'} width={'28px'} /></div>
            </div>
            </div>
           
            <MiniDrawer open={drawer} />
        </>
    )
}

export default Header