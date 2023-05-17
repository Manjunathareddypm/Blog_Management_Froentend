import React from 'react'
import { useEffect, useState } from 'react'
import { findLikedPost, findMyPost } from '../Services/blogs.service'
import Header from '../Header/Header'
import Blog from '../Blog/BlogModel/Blog'
import { Card } from '@mui/material'
import { useSelector } from 'react-redux'
function LikedPost() {
    const author = useSelector((c) => {
        return c.allBlogReducer.authorName
    })
    const [data1, setData] = useState([])
    const fetch = async () => {
        const data = await findLikedPost(author)
    
        setData(data.data.data)

    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <>

            <Header />

            <div className='postCss' style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {

                    data1.map((x) => (
                        <div key={x._id}>
                            <Blog
                                post={"LikedPost"}
                                id={x._id}
                                Type={x.Type}
                                Id={x._id}
                                Email={x.Email} date={x.date}
                                Title={x.Title}
                                Description={x.Description}
                                Views={x.Views.length}
                                obj={x}
                                Likes={x.Likes}
                                NumberOfLikes={x.Likes.length}
                                fetch={fetch}
                                key={x._id}
                                imageData = {x.data}

                
                            />
                        </div>

                    ))

                }
            </div>

        </>
    )
}

export default LikedPost



