import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Typography } from '@mui/material';
import App from '../Popper/App';
import { viewPostService } from '../../Services/blogs.service';
import './Blog.css'
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
import DateDisplay from '../../Utils/DateDisplay';
import { findAllComments } from '../../Services/blogs.service';
import { getReplyToNumber } from "../../Services/blogs.service";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';

function Blog(props) {
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


  const onClickDeleteIcon = async () => {
    const data = await deleteBlogsService(props.Id)
    if (props.post) {
      props.fetch()
    } else {
      props.value()
    }

  }


  const likeButton = async (id) => {
    const data = await likeButtonService(id, authorName)
    if (props.post == "MyPost" || props.post == "LikedPost") {
      props.fetch()
    }


    if (data.data.data.Likes.includes(authorName)) {
      setIsLiked(true)
      // props.value(valueOfBlogType)
    } else if (!data.data.data.Likes.includes(authorName)) {
      setIsLiked(false)
      // props.value(valueOfBlogType)
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
      <div className='blog-main'>
        <Card style={{ marginTop: '30px' }} className='outline-blog1'>
          <div className='content-part1'>
            <div className='for-left-top-1'>
              <Link to={`/detailView/${props.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div onClick={onClickOnView} className='for-img-default'>
                  <img src={props.imageData ? props.imageData : putImage} height={'100%'} width={'100%'} />
                </div>
              </Link>
              <div className='top-rg233t-content'>

                <div style={{ display: 'flex' }}>
                  <div className='forTitlepart'>
                    {props.Title}
                  </div>
                  {authName == props.Email ?
                    <div className='iconsdelete-view-edit'>
                      <div className=''>
                        <Link to={`/editBlog/${props.id}`}>
                          {/* <EditIcon className='editBtnclass' /> */}
                          <EditIcon sx={{ border: '0px', color: "black" }} className='editBtnclass' />
                        </Link>
                      </div>
                      <div>
                        <DeleteForeverIcon className='deleteBtnclass' onClick={onClickDeleteIcon} style={{ marginLeft: '5px' }} />
                      </div>
                    </div>
                    :
                    <div></div>
                  }


                </div>

                <div className='authorNameOfBlog'>
                  - {props.Email}
                </div>




                <div className='upperBtm'>

                  <div className='descriptionInHome'>
                    {props.Description}
                  </div>

                </div>

              </div>

              <div>

              </div>
            </div>
          </div>

          <div className='content-part2'>
            <Button onClick={() => { likeButton(props.id, props.Email, props.obj) }} className='con-par2'>
              {isLiked ? <ThumbUpIcon style={{ fontSize: '23px', color: '#1677ff', fontWeight: 900, cursor: 'pointer' }} /> :

                <ThumbUpOutlinedIcon style={{ fontSize: '23px', cursor: 'pointer', color: 'black' }} />
              }<p style={{ fontWeight: '640', fontWeight: 'bold', color: 'black', fontSize: '14px', marginLeft: '2px' }}>{props.NumberOfLikes}</p>
            </Button>
            <Link to={`/detailView/${props.id}`} style={{ textDecoration: 'none' }}>
              <div onClick={onClickOnView} className='con-par2'><ModeCommentOutlined height={'23px'} style={{ cursor: 'pointer', marginTop: '3px', color: 'black' }} /><p style={{ fontWeight: '640', color: 'black', fontSize: '14px', marginLeft: '4px', marginRight: '1px' }}>{Comments + numberOfComments}</p></div>
            </Link>
            <div className='con-par2' style={{ marginLeft: '15px' }}> <App id={props.id} /></div>
            <div className='con-par2' style={{ marginLeft: '20px' }}> <VisibilityIcon style={{ marginRight: '0px' }} />{props.Views}</div>

            <Link to={`/detailView/${props.id}`}>
              {/* <Button onClick={onClickOnView}
                variant="outlined" size='small' style={{ height: '20px', marginLeft: '15px', marginTop: '8px' }}>View</Button> */}
              <Button onClick={onClickOnView}
                variant="text" size='small' style={{ height: '20px', textTransform: 'none', marginLeft: '0px', marginTop: '8px' }}>View</Button>

            </Link>

            <div className='con-par2'>
              <div style={{ marginLeft: '480px' }}>
                <DateDisplay date={props.date} />
              </div>

            </div>
          </div>
        </Card>
      </div>

    </>
  )
}

export default Blog
