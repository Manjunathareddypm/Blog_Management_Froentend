import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { postComments } from '../Services/blogs.service';
import { findAllComments } from '../Services/blogs.service';
import { getPostByIdService } from '../Services/blogs.service';
import { collectAllReplies } from '../Services/blogs.service';
import Comment from './Comment';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { sendEmailForComment } from '../Services/blogs.service';

const Container = styled(Box)`
    margin-top: 60px;
    width: 957px;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    
    width: 999px;
    margin: 0 25px;
`;

const initialValue = {
    Comment: ''

}

const Comments = ({ post, id, postAuthor, initialValueForComments, fetch, Title }) => {

    const authorName = useSelector((c) => {
        return c.allBlogReducer.authorName
    })
    const [error, setError] = useState(false)
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [parentId, setParentId] = useState([])
    const checkReplies = async () => {
        const data = await collectAllReplies()
        if (data) {

            setParentId(data.data.data)

        }
    }



    useEffect(() => {
        const getData = async () => {
            const response = (await findAllComments(id)).data.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            setComments(response);

        }
        getData()
        checkReplies()
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            Comment: e.target.value
        });
    }


    const throttle = (fn, limit) => {
        let flag = true;
        return function(){
          let context = this;
          let args = arguments;
          if(flag){
            fn.apply(context, args);
            flag = false;
            setTimeout(() => {
              flag=true;
            }, limit);
          }
        }
      }

    const addComment = async () => {
        if (await comment.Comment.length <= 0) {
            setError(true);
            return;
        }
        else {
            const commnet = await postComments(id, authorName, comment);
            fetch()
            setComment(initialValue)
            setToggle(prev => !prev)
            initialValueForComments()
            const email = await sendEmailForComment(postAuthor, comment, authorName, Title)
        }
    }


    return (
        <Box style={{
            marginLeft: '80px', paddingBottom: '25px'
        }}>
            <Container >

                <StyledTextArea
                    minRows={4}
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)}
                    value={comment.Comment}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40, backgroundColor: '#1677ff', marginLeft: '930px', marginTop: '5px' }}
                    onClick={(e) => addComment(e)}
                >Post <SendIcon style={{ marginLeft: '5px' }} /> </Button>
            </Container>
            <Box>
                {
                    <>
                        {/* {comments && comments.length > 0 && comments.map((comment) => (
                            <>
                                <Comment key={comment._id} comment={comment} id={id} fetch={fetch} setToggle={setToggle} initialValueForComments={initialValueForComments} />
                                {parentId && parentId.length > 0 && parentId.map((nestedComment) => (

                                    nestedComment.CommentParentId == comment._id ?
                                        <Comment key={nestedComment._id} comment={nestedComment} type={"Nested"} fetch={fetch} id={id} setToggle={setToggle} />

                                        : <></>
                                ))}


                            </>
                        ))} */}
                        {comments && comments.length > 0 && comments.map((comment) => (
                            <React.Fragment key={comment._id}>
                                <Comment comment={comment} id={id} fetch={fetch} setToggle={setToggle} initialValueForComments={initialValueForComments} />
                                {parentId && parentId.length > 0 && parentId.map((nestedComment) => (
                                    nestedComment.CommentParentId === comment._id ? (
                                        <Comment key={nestedComment._id} comment={nestedComment} type="Nested" fetch={fetch} id={id} setToggle={setToggle} />
                                    ) : (
                                        null
                                    )
                                ))}
                            </React.Fragment>
                        ))}



                    </>

                }
                {

                }
            </Box>
        </Box>
    )
}

export default Comments;
