import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../CreateBlog/CreateBlog.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import image from '../../assest/otherOption.jpg'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createPostService } from '../../Services/blogs.service';
import SelectSmall from '../../Utils/tab';
import { useNavigate } from 'react-router-dom';
import { Author } from '../../Pages/LoginPage/Login';
import Header from '../../Header/Header';
import { getPostByIdService } from '../../Services/blogs.service';
import { useParams } from 'react-router-dom'
import { updatePostService } from '../../Services/blogs.service';
import { selectTypeOfBlog } from '../../redux/Slice/HomeDashboardSlice';
import { storage } from '../../firebase';

export default function EditBlog() {

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState(null);
    const [initialImage, setInitialIamge] = useState()
    const propValue = "Create"
    const titleregex = /^.{3,}$/
    const descRegex = /^[\s\S]{3,}$/;
    const [blog, setBlog] = useState({
        Title: "", Description: "", Type: "Other", data: ''
    })

    const [regex, setRegex] = useState({
        titleError: false, descriptionError: false, titleHelper: "", descriptionHelper: ""
    })

    const valueOfType = useSelector((c) => {
        return c.allBlogReducer.typeOfBlog
    })

    useEffect(() => {
        setBlog((prev) => ({
            ...prev, Type: valueOfType
        }))

    }, [valueOfType])


    const takeTitle = (e) => {
        setBlog((prev) => ({
            ...prev, Title: e.target.value
        }))

    }
    const takeDescription = (e) => {
        setBlog((prev) => ({
            ...prev, Description: e.target.value
        }))
        console.log(descRegex.test(blog.Description));
        console.log(e.target.value);
    }

    const handlePhoto = (e) => {
        setImageUrl(e.target.files[0]);
    };

    const onClickPublish = async () => {
        const desTest = await descRegex.test(blog.Description)
        const titleTest = await titleregex.test(blog.Title)
       
        console.log(desTest,"DESTEST");
        if (titleTest) {
            setRegex((prev) => ({
                ...prev, titleError: false, titleHelper: ""
            }))
        }
        else {
            setRegex((prev) => ({
                ...prev, titleError: true, titleHelper: "Blog title must contain at least 3 letters."
            }))
        }

        if (desTest) {
            setRegex((prev) => ({
                ...prev, descriptionError: false, descriptionHelper: ""
            }))
        }
        else {
            setRegex((prev) => ({
                ...prev, descriptionError: true, descriptionHelper: "Blog description must contain at least 3 letters."
            }))
        }

        if (imageUrl &&  desTest && titleTest) {
            const time = Date.now();
            const imageRef = ref(storage, `images/blogs/${time}`);
            uploadBytes(imageRef, imageUrl)
                .then((res) => getDownloadURL(res.ref))
                .then((err) => {
                    const dbCall = async () => {
                        const response = await updatePostService(id, blog, err);
                        if (response) {
                            dispatch(selectTypeOfBlog("All"))
                            navigate("/dashboard")
                        }
                    };
                    dbCall();
                });
        } else if (desTest && titleTest) {
            const response = await updatePostService(id, blog, blog.data)
            if (response) {
                dispatch(selectTypeOfBlog("All"))
                navigate("/dashboard")
            }
        }

    }


    useEffect(() => {
        if (imageUrl) {
            const time = Date.now();
            const imageRef = ref(storage, `images/blogs/${time}`);
            uploadBytes(imageRef, imageUrl)
                .then((res) => getDownloadURL(res.ref))
                .then((err) => {
                    setBlog((prev) => ({
                        ...prev, data: err
                    }))
                });
        }
    }, [imageUrl])

    useEffect(() => {
        const fetch = async () => {
            const data = await getPostByIdService(id)
            dispatch(selectTypeOfBlog(data.data.data[0].Type))
            setBlog((prev) => ({
                ...prev, Title: data.data.data[0].Title, Description: data.data.data[0].Description, Type: data.data.data[0].Type, data: data.data.data[0].data
            }))
        }
        fetch()

    }, [])

    useEffect(() => {
        const fetch = async () => {
           
            setBlog((prev) => ({
                ...prev, Title:blog.Title , Description: blog.Description, Type: blog.Type, data: blog.data
            }))
        }
        fetch()

    }, [imageUrl])


    return (

        <>
            <Header propValue={propValue} />


            <div className="createblog-ui-main">
                <div style={{ width: '70vw' }} >
                    <div style={{ height: '20%', width: '100%', paddingTop: '2rem' }}>
                        <img src={blog.data?blog.data:image} style={{ height: '20rem' }} width={'100%'} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ margin: '10px' }}>
                            <SelectSmall />
                        </div>
                        <div className="publishBtm">
                            <Button
                                onClick={onClickPublish}
                                variant="contained"
                                style={{
                                    backgroundColor: "orange",
                                    height: "42px",
                                    marginLeft: "0px",
                                    width: "156px",
                                }}
                                endIcon={<SendIcon />}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                    <div className="forselctsmall">
                        <input style={{ paddingTop: '5px', paddingLeft: '2px', margin: '10px' }}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="photo"
                            onChange={handlePhoto}
                        />
                    </div>
                    <div className="title-box" style={{
                        display: "flex",
                        flexdirection: "row",
                        justifycontent: "flex-start",
                        alignitems: "flex-start",
                        border: "none",
                        color: "orange",
                        outline: 'none'
                    }}>
                        <TextField
                            style={{
                                display: "flex",
                                flexdirection: "row",
                                justifycontent: "flex-start",
                                alignitems: "flex-start",
                                border: "none",
                                marginTop: "2rem",
                                outline: 'none',
                                boxShadow: 'none'
                            }}
                            placeholder="Title"
                            variant="standard"
                            required
                            value={blog.Title}
                            onChange={takeTitle}
                            error={regex.titleError}
                            helperText={regex.titleHelper}
                        />
                    </div>
                    <div className="decription-box">
                        <div>
                            <TextField
                                placeholder="Write your story..."
                                multiline
                                
                                variant="standard"
                                required
                                value={blog.Description}
                                onChange={takeDescription}
                                rows={15}
                                error={regex.descriptionError}
                                helperText={regex.descriptionHelper}
                                style={{ height: '10rem', width: '100%', marginTop: "2rem", border: 'none', outline: 'none', boxShadow: 'none' }}
                                // InputProps={{
                                //     style: {
                                //         outline: "none",
                                //     },
                                // }}
                            />
                        </div>

                    </div>
                </div>



            </div>

        </>
    )
}
