import { Typography, Box, styled } from "@mui/material";
import { AccountCircle, Delete } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { deleteComment } from "../Services/blogs.service";
import DateDisplay from "../Utils/DateDisplay";
import CardActions from '@mui/material/CardActions';
import { replyToComment } from "../Services/blogs.service";
import { useEffect, useState } from "react";
import { TextareaAutosize, Button } from '@mui/material';
import { collectAllReplies } from "../Services/blogs.service";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import { deleteReply } from "../Services/blogs.service";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { likeComment } from "../Services/blogs.service";
import { getParticularComment } from "../Services/blogs.service";
import { getParticularReplyComment } from "../Services/blogs.service";
import { likeCommentReplyService } from "../Services/blogs.service";
import SendIcon from '@mui/icons-material/Send';
const Component = styled(Box)`
    margin-top: 30px;
    background: #FdFdFd;
    padding: 10px;
    border:0.3px solid blue;
    border-radius:10px ;
    
`;

const Container = styled(Box)`

    margin-bottom: 5px;
    width:800px;
`;

const Container1 = styled(Box)`
  
    display: flex;
    margin-bottom: 2px;

`;

const Name = styled(Typography)`
    font-weight: 700,
    font-size: 20px;
    margin-right: 20px;
`;

const StyledDate = styled(Box)`
    font-size: 14px;
    color: #878787;
    
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 907px;
    margin: 0 20px;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle, type, fetch, id, initialValueForComments }) => {

    const initialValue = {
        Comment1: ''
    }
    const [seeCommentPost, setSeeCommentPost] = useState(false)
    const [Comment1, setComment1] = useState(initialValue);
    const [parentId, setParentId] = useState([])
    const [NumberOfLikes, setNumberOfLikes] = useState()
    const [commentLiked, setCommentLiked] = useState()
    //CommentParentId
    const checkReplies = async () => {
        const data = await collectAllReplies()
        if (data) {
            setParentId(data.data.data)
        }
    }

    const handleChange = (e) => {
        setComment1({
            Comment1: e.target.value
        })
    }

    const authorName = useSelector((c) => {
        return c.allBlogReducer.authorName
    })

    const onClickReply = () => {
        setSeeCommentPost(!seeCommentPost)
    }

    const likeCommentPost = async () => {
        if (type == "Nested") {
            await likeCommentReplyService(comment._id, authorName)
        } else {
            const data = await likeComment(comment._id, authorName)
        }
        checkInitialStateForComment()
    }

    const removeComment = async () => {

        if (type == "Nested") {

            await deleteReply(comment._id)
            fetch()
            initialValueForComments()
        } else {

            await deleteComment(comment._id);
            fetch()
            initialValueForComments()
        }
        setToggle(prev => !prev);

    }



    const addComment = async () => {

        if (await Comment1.Comment1.length <= 0) {
            return;
        }
        const commnet = await replyToComment(authorName, Comment1, comment._id, id);
        fetch()
        setComment1(initialValue)
        setToggle(prev => !prev);
    }

    const checkInitialStateForComment = async () => {

        if (type == "Nested") {
            const data2 = await getParticularReplyComment(comment._id)
            // console.log(data2.data.data[0].NumberOfLikes);
            setNumberOfLikes(data2.data.data[0].NumberOfLikes)
            if (data2.data.data[0].Likes.includes(authorName)) {
                setCommentLiked(true)
            } else {
                setCommentLiked(false)
            }

        } else {
            const data = await getParticularComment(comment._id)
            setNumberOfLikes(data.data.data[0].NumberOfLikes)
            if (data.data.data[0].Likes.includes(authorName)) {
                setCommentLiked(true)
            } else {
                setCommentLiked(false)
            }

        }



    }

    useEffect(() => {
        checkReplies()
        checkInitialStateForComment()
    }, [])
    return (
        <div>
            {
                type == "Nested" ?
                    <Component width={'905px'} marginLeft={'98px'}>
                        <Container1 >
                            <AccountCircle style={{ color: '#1677ff' }} /><Name style={{ fontWeight: '500', color: 'blue' }}>{comment.Author}</Name>
                            {comment.Author === authorName && <div> <DeleteForeverIcon className='deleteBtnclass' style={{ marginLeft: 665 }} onClick={() => removeComment()} /></div>}
                        </Container1>
                        <Typography style={{ marginLeft: '20px', backgroundColor: '#fdfdfd', marginRight: '20px', padding: '6px' }}>{comment.Comment ? comment.Comment : comment.Comment1}</Typography>
                        <CardActions >
                            <Button className="con-par2" onClick={likeCommentPost}>
                                {commentLiked ? <ThumbUpIcon style={{ color: '#1677ff' }} /> : <ThumbUpOffAltIcon style={{ color: '#1677ff' }} />}
                                <p style={{ color: 'black' }}>{NumberOfLikes} </p>
                            </Button>

                            <StyledDate style={{ marginLeft: '730px' }} ><DateDisplay date={comment.createdAt} /></StyledDate>
                        </CardActions>

                    </Component> :
                    <Component width={'984px'} marginLeft={'19px'}>
                        <Container1 >
                            <AccountCircle style={{ color: '#1677ff' }} /><Name style={{ fontWeight: '500', color: '#0958d9' }}>{comment.Author}</Name>
                        </Container1>
                        <Typography style={{ marginLeft: '20px', backgroundColor: '#fdfdfd', marginRight: '20px', padding: '2px' }}>{comment.Comment ? comment.Comment : comment.Comment1}</Typography>
                        <CardActions >
                            <Button onClick={likeCommentPost} className="con-par2">
                                {commentLiked ? <ThumbUpIcon style={{ color: '#1677ff' }} /> : <ThumbUpOffAltIcon style={{ color: '#1677ff' }} />}
                                <p style={{ color: 'black' }}>{NumberOfLikes} </p>
                            </Button>

                            <p onClick={onClickReply}><ReplyIcon style={{ color: '#1677ff', marginRight: '0px' }} /></p>
                            {comment.Author === authorName ? <div> <DeleteForeverIcon className='deleteBtnclass' style={{ marginLeft: 17 }} onClick={() => removeComment()} /></div> : <div style={{ width: '47px' }}></div>}
                            <StyledDate style={{ marginLeft: '740px' }} ><DateDisplay date={comment.createdAt} /></StyledDate>
                        </CardActions>
                    </Component>
            }


            {
                seeCommentPost ? (
                    <Container>
                        <StyledTextArea style={{ marginTop: '10px', width: '913px', marginLeft: '100px' }}
                            minRows={4}
                            placeholder="what's on your mind?"
                            onChange={(e) => handleChange(e)}
                            value={Comment1.Comment1}
                        ></StyledTextArea>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            style={{ height: 40, marginLeft: '918px', marginTop: '10px', backgroundColor: '#1677ff' }}
                            onClick={(e) => addComment(e)}
                        >
                            Post <SendIcon style={{ marginLeft: '5px' }} />
                        </Button>
                    </Container>
                ) : (
                    <div></div>
                )
            }
        </div >
    )
}

export default Comment;

