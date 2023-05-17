import React from 'react';
import { Button, Popover } from 'antd';
import './App1.css'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton, InstapaperShareButton, InstapaperIcon, RedditShareButton, RedditIcon } from 'react-share';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const Content = (props) => {
    
const handleClick1 = () => {
    navigator.clipboard.writeText( props.urlToSharePost )
    alert("copied")
}

   return (

        <div className='poperclss'>
            <WhatsappShareButton
               
                url={props.urlToSharePost}
                quote={"Welocme"}
                hashtag="#React"
            >
                <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>

            <FacebookShareButton
                url={props.urlToSharePost}
                quote={"Welocme"}
                hashtag="#React"
            >
                <FacebookIcon size={30} round={true} />
            </FacebookShareButton>

            <RedditShareButton
                url={props.urlToSharePost}
                quote={"Welocme"}
                hashtag="#React"
            >
                <RedditIcon size={30} round={true} />
            </RedditShareButton>
            <ContentCopyIcon onClick={handleClick1} style={{  fontSize: 27, marginBottom: '6px' }} />

        </div>
    );
}



const App = (props) => {

    const handleClick = () => {    
        alert("copied")
    }
    const urlToSharePost = 'http://localhost:3000/detailView/' + props.id
    return (
        <Popover content={<Content urlToSharePost={urlToSharePost} />} title="">
        {props.valueOfType?<Button style={{width:'87px',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}  type="primary" ><ShareIcon fontSize='25px'  /> <div>Share</div></Button>
    :    <Button style={{width:'25px',height:'23px',display:'flex',justifyContent:'center'}}  type="primary" ><ShareIcon fontSize='25px'  /></Button>
    }
        </Popover>
    );
};


export default App;
