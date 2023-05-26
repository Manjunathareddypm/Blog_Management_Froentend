import React, { useEffect, useState } from 'react'
import { findMyPost } from '../Services/blogs.service'
import Header from '../Header/Header'
import Blog from '../Blog/BlogModel/Blog'
import { useSelector } from 'react-redux'
import './Posts.css'
function Mypost() {
    const [data1, setData] = useState([])
    const author = useSelector((c) => {
        return c.allBlogReducer.authorName
    })
    const fetchForMyPost = async () => {
        const data = await findMyPost(author)
        setData(data.data.data)
    }
    useEffect(() => {
        fetchForMyPost()
    }, [])
    return (
        <>
            <Header />
            <div className='postCss' style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {
                    data1.map((x) => (
                        <div key={x._id}>
                            <Blog
                                post={"MyPost"}
                                id={x._id}
                                Type={x.Type}
                                Id={x._id}
                                Email={x.Email} date={x.date}
                                Title={x.Title}
                                Views={x.Views.length}
                                obj={x}
                                Likes={x.Likes}
                                NumberOfLikes={x.Likes.length}
                                fetch={fetchForMyPost}
                                key={x._id}
                                Description={x.Description}
                                imageData = {x.data}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Mypost
