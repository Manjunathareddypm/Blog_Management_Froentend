import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashBoard from './Pages/DashBoard/DashBoard';
import ViewBlog from './Blog/ViewBlog/ViewBlog';
import CreateBlog from './Blog/CreateBlog/CreateBlog';
import LikedPost from './Posts/LikedPost';
import Mypost from './Posts/Mypost';
import Login from './Pages/LoginPage/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditBlog from './Blog/BlogModel/EditBlog';
import { setAuthenticated, addTokenToSystem } from './redux/Slice/Authentications';
import CreateBlogEmoji from './Blog/CreateBlog/CreateBlogEmoji';
function App() {

  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  
  if (token) {
    dispatch(addTokenToSystem(token))
    dispatch(setAuthenticated(true))
  }
  const tokenValue = useSelector((c) => {
    return c.userReducer.token
  })

  const valueOfAuthenticated = useSelector((c) => {
    return c.userReducer.isAuthenticated
  })


  return (
    <>
      <BrowserRouter>
        <Routes>
          {tokenValue && valueOfAuthenticated
            ?
            (
              <>
                <Route path='/createPost' element={<CreateBlog />} />
                <Route path='/createPostEmoji/:id' element={<CreateBlogEmoji />} />
                <Route path='/dashboard' element={<DashBoard />} />
                <Route path='/detailView/:id' element={<ViewBlog />} />
                <Route path='/editBlog/:id' element={<EditBlog />} />
                <Route path='/myPosts' element={<Mypost />} />
                <Route path='/likedPost' element={<LikedPost />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />

              </>
            )
            :
            (
              <>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />

              </>
            )
          }
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
