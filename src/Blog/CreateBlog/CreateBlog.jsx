
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateBlog.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import image from "../../assest/logo_blogger_40px_2x.png";
import { createPostService } from "../../Services/blogs.service";
import SelectSmall from "../../Utils/tab";
import { useNavigate } from "react-router-dom";
import { Author } from "../../Pages/LoginPage/Login";
import Header from "../../Header/Header";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { selectTypeOfBlog } from "../../redux/Slice/HomeDashboardSlice";
import { Container, Input } from "@mui/material";
import img from "../../assest/blog-image1.jpg"

export default function CreateBlog(id) {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const propValue = "Create";
  const titleregex = /^.{3,}$/;
  const descRegex = /^[\s\S]{3,}$/
  const [blog, setBlog] = useState({
    Title: "",
    Description: "",
    Type: "Other"
  });
  const [data, setData] = useState("")
  const [regex, setRegex] = useState({
    titleError: false,
    descriptionError: false,
    titleHelper: "",
    descriptionHelper: "",
  });

  const valueOfType = useSelector((c) => {
    return c.allBlogReducer.typeOfBlog;
  });

  useEffect(() => {
    setBlog((prev) => ({
      ...prev,
      Type: valueOfType,
    }));

  }, [valueOfType]);

  const takeTitle = (e) => {
    setBlog((prev) => ({
      ...prev,
      Title: e.target.value,
    }));

  };
  const takeDescription = (e) => {
    setBlog((prev) => ({
      ...prev,
      Description: e.target.value,
    }));

  };

  const onClickPublish = async () => {
    const titleTest = titleregex.test(blog.Title);
    const desTest = descRegex.test(blog.Description);

    if (titleTest) {
      setRegex((prev) => ({
        ...prev,
        titleError: false,
        titleHelper: "",
      }));
    } else {
      setRegex((prev) => ({
        ...prev,
        titleError: true,
        titleHelper: "Blog title must contain at least 3 letters.",
      }));
    }

    if (desTest) {
      setRegex((prev) => ({
        ...prev,
        descriptionError: false,
        descriptionHelper: "",
      }));
    } else {
      setRegex((prev) => ({
        ...prev,
        descriptionError: true,
        descriptionHelper: "Blog description must contain at least 3 letters.",
      }));
    }
    if (imageUrl) {

      const time = Date.now();
      const imageRef = ref(storage, `images/blogs/${time}`);
      uploadBytes(imageRef, imageUrl)
        .then((res) => getDownloadURL(res.ref))
        .then((err) => {
          const dbCall = async () => {
            const response = await createPostService(blog, err);
            if (response) {
              navigate("/createPostEmoji")
            }
          };
          dbCall();
        });
    } else {

      const response = await createPostService(blog);
      if (response) {
        navigate("/createPostEmoji")
      }
    }

  }


  const handlePhoto = (e) => {
    setImageUrl(e.target.files[0]);
  };
  useEffect(() => {

    return () => {
      dispatch(selectTypeOfBlog("All"))
    }

  }, [])
  useEffect(() => {
    if (imageUrl) {
      const time = Date.now();
      const imageRef = ref(storage, `images/blogs/${time}`);
      uploadBytes(imageRef, imageUrl)
        .then((res) => getDownloadURL(res.ref))
        .then((err) => {
          setData(err)
        });
    }
  }, [imageUrl])

  return (
    <>
      <Header propValue={propValue} />
      {/* <Container> */}

      <div className="createblog-ui-main">
        <div style={{ width: '70vw' }} >
          <div style={{ height: '20%', width: '100%', paddingTop: '2rem' }}>
            <img src={data ? data : img} style={{ height: '20rem' }} width={'100%'} />
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
                Publish
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
                maxRows={4}
                variant="standard"
                required
                value={blog.Description}
                onChange={takeDescription}
                rows={15}
                error={regex.descriptionError}
                helperText={regex.descriptionHelper}
                style={{ height: '10rem', width: '100%', marginTop: "2rem", border: 'none', outline: 'none', boxShadow: 'none' }}
                InputProps={{
                  style: {
                    outline: "none", // Remove the outline
                  },
                }}
              />
            </div>

          </div>
        </div>



        <div className="rgt-lowerpart">
          <div className="button-rgt-part">


          </div>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
}