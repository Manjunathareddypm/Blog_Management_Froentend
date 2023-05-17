
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Typography, CardMedia, CardHeader, CardContent, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import App from '../Popper/App';
import { viewPostService } from '../../Services/blogs.service';
import './BlogPost.css'
import { Link } from 'react-router-dom';
import { deleteBlogsService } from '../../Services/blogs.service';
import { sendTypeImage } from '../../Utils/ImageSelectionByType';
import { useParams } from 'react-router-dom';
import { Author } from '../../Pages/LoginPage/Login';
import { useSelector } from 'react-redux';
import { getEmailOfUser } from '../../Services/blogs.service';
import { useDispatch } from 'react-redux';
import { setAuthorName } from '../../redux/Slice/HomeDashboardSlice';
import { likeButtonService } from '../../Services/blogs.service';
import chatImage from '../../assest/messenger.png'
import DateDisplay from '../../Utils/DateDisplay';
import { findAllComments } from '../../Services/blogs.service';
import { getReplyToNumber } from "../../Services/blogs.service";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import imageDefault from '../../assest/fitnessImage.jpeg'

function BlogPost(props) {
  const dispatch = useDispatch()

  const { id } = useParams()
  const authorName = localStorage.getItem('author')
  const authName = useSelector((c) => {
    return c.allBlogReducer.authorName
  }
  )

  const [isLiked, setIsLiked] = useState()
  const [Comments, setComments] = useState([])
  const valueOfBlogType = useSelector((c) => {
    return c.allBlogReducer.typeOfBlog
  })
  const [numberOfComments, setNumberComments] = useState()

  const info = props.Title


useEffect(()=>{
  document.addEventListener('DOMContentLoaded', function() {
    const accountIcon =  document.querySelector('.blogPostTitle');
    if (accountIcon) {
      accountIcon.style.setProperty('--info', `"${info}"`);
    }
  }); 
},[info])



  const likeButton = async (id) => {
    const data = await likeButtonService(id, authorName)
    if (props.post == "MyPost" || props.post == "LikedPost") {
      props.fetch()
    }


    if (data.data.data.Likes.includes(authorName)) {
      setIsLiked(true)
      props.value(valueOfBlogType)
    } else if (!data.data.data.Likes.includes(authorName)) {
      setIsLiked(false)
      props.value(valueOfBlogType)
    }
  }


  const checkInitialStateOfLike = async () => {
    const data1 = await getReplyToNumber(props.id)
    setNumberComments(data1.data.data.length)
    if (props.Likes.includes(authorName)) {
      setIsLiked(true)
    }
    const data = await findAllComments(props.id)
    setComments(data.data.data.length)
  }

  const onClickOnView = async () => {
    const data = await viewPostService(props.id, authName, props.obj)
  }

  useEffect(() => {
    checkInitialStateOfLike()
  }, [])
  let putImage = sendTypeImage(props.Type)

  return (
    <>
      <div className='blog-main1'>
        <Card style={{ marginTop: '30px' }} className='outline-blog' sx={{ maxWidth: 310 }}>
          <Link to={`/detailView/${props.id}`} style={{ textDecoration: 'none' }}>
        

            <div style={{ height: '152px', overflow: 'hidden' }}>
              <div style={{textAlign:'center',background:'black'}}> <p style={{writingMode:'vertical-lr',background:'black', opacity:"40%" ,height:'152px', margin:'0px 0px 0px 0px',padding:'0px 0px 0px 0px',color:'white', fontSize:'25px',fontWeight:'bolder', position:'absolute'}}>{props.Type}</p></div>
              <CardMedia
                onClick={onClickOnView}
                component="img"
                style={{ width: '100%',minHeight:'152px'}}
                image={props.imageData ? props.imageData : putImage}
                alt="Blog post image"
              />
            </div>

          </Link>
          <CardContent>

            <Typography className='blogPostTitle' variant="body4"  >
              {props.Title}
             
            </Typography>
            <Typography className='descBlogPost' variant="body2" marginTop={"6px"} fontSize={"11px"}>
              {props.Description}
            </Typography>
            <div className='authorNameInBlogPost'>
              -{props.Email}
            </div>
          </CardContent >
          <div className='cardActionContainer'>
            <CardActions className='cardActionBlogPost' >
              <Button onClick={() => { likeButton(props.id, props.Email, props.obj) }} >
                {isLiked ? <ThumbUpIcon style={{ fontSize: '16px', color: '#1677ff', fontWeight: 900, cursor: 'pointer' }} /> :

                  <ThumbUpOutlinedIcon style={{ fontSize: '16px', cursor: 'pointer', color: 'black' }} />
                }<p style={{ fontWeight: '640', fontWeight: 'bold', color: 'black', fontSize: '13px', marginLeft: '2px' }}>{props.NumberOfLikes}</p>
              </Button>
              <Link to={`/detailView/${props.id}`} style={{ textDecoration: 'none' }}>
                <div onClick={onClickOnView} className='commentBlogPost' ><ModeCommentOutlined height={'10px'} style={{ cursor: 'pointer', marginTop: '3px', color: 'black', fontSize: '16px' }} /><p style={{ fontWeight: '640', color: 'black', fontSize: '13px', marginLeft: '4px', marginRight: '1px' }}>{Comments + numberOfComments}</p></div>
              </Link>
              <div style={{ marginLeft: '17px' }}> <App id={props.id} /></div>
              <div className='commentBlogPost'>  <VisibilityIcon style={{ marginLeft: '10px' }} /><p style={{ marginLeft: '2px', fontWeight: 'bold', color: 'black', fontSize: '13px' }}>{props.Views}</p></div>

              <Link to={`/detailView/${props.id}`} style={{ textDecoration: 'none' }}>

                <div className='commentBlogPost' style={{ marginLeft: '7.5px', width: '40px', textDecoration: 'none', color: 'blue', fontSize: '13px' }} onClick={onClickOnView}
                  variant="text" size='small' >View</div>

              </Link>
              <div style={{ display: 'flex' }}>
                
              </div>
            </CardActions>
          </div>
          <Typography className='date1Blog'>
            <DateDisplay date={props.date} />
          </Typography>
        </Card>
      </div>

    </>
  )
}

export default BlogPost
