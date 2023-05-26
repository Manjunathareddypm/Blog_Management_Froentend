import { createSlice } from "@reduxjs/toolkit";
const initialState = { 
    allPosts: [], 
    typeOfBlog: 'All', 
    numberOfLikes: 0, 
    numberOfviews: 0, 
    typeOfBlogInDashBoard: 'All', 
    authorName: localStorage.getItem('author'), 
    forSearchType: "Home" ,
    relevanceType:"All" ,
    isPublish :false }

const allBlogs = createSlice({
    name: 'all-post-blogs',
    initialState,
    reducers:
    {
        getAllBlogs: (state, actions) => {
            state.allPosts = actions.payload
        },
        selectTypeOfBlog: (state, actions) => {
            state.typeOfBlog = actions.payload
        },
        getNumberOfLikes: (state, actions) => {
            state.numberOfLikes = actions.payload
        },
        selectTypeOfBlogInDashBoard: (state, actions) => {
            state.typeOfBlogInDashBoard = actions.payload
        },
        setAuthorName: (state, actions) => {
            state.authorName = actions.payload
        },
        setForSearchType: (state, actions) => {
            state.forSearchType = actions.payload
        },
        setrelevanceType: (state, actions) => {
            state.relevanceType = actions.payload
        },
        setIsPublishValue : (state, actions) => {
            state.isPublish = actions.payload
        }
    }
})

export const { getAllBlogs, selectTypeOfBlog, getNumberOfLikes, selectTypeOfBlogInDashBoard, setAuthorName, setForSearchType ,setrelevanceType ,setIsPublishValue} = allBlogs.actions
export default allBlogs.reducer
