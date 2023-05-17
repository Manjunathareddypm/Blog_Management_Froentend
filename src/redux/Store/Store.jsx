import { configureStore } from "@reduxjs/toolkit";
import allBlogs from "../Slice/HomeDashboardSlice";
import userAuthor1 from '../Slice/Authentications'
const store = configureStore({
    reducer:{
        allBlogReducer : allBlogs,
        userReducer : userAuthor1
    }
})

export default store