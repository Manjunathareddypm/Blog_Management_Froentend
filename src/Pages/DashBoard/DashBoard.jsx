import Header from '../../Header/Header'
import imageForBlog from '../../assest/blog12.jpg'
import '../DashBoard/DashBoard.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material';
import NativeSelectDemo from '../../Utils/NativeSelectDemo'
import { arrangeByLikesSortLowToHigh, getAllBlogsService } from '../../Services/blogs.service'
import { arrangeByLikesSortHighToLowService } from '../../Services/blogs.service'
import NativeSelectDemo1 from '../../Utils/NativeSelectDemo1'
import { selectTypeOfBlog } from '../../redux/Slice/HomeDashboardSlice'
import BlogPost from '../../Blog/BlogM/BlogPost'
function DashBoard() {
  const dispatch = useDispatch()
  const [stateForBlogHome, setstateForBlogHome] = useState([])
  const [typeValue, setType] = useState("All")
  const valueOfBlogType = useSelector((c) => {
    return c.allBlogReducer.typeOfBlog
  })
  const valuOfRelevance = useSelector((c) => {
    return c.allBlogReducer.relevanceType
  })
  const setValueOfTypeInChild = async (value1) => {
    await setType(value1)
  }

  const value = async (typeValue) => {
    const data = await getAllBlogsService()
    const data1 = await arrangeByLikesSortLowToHigh()
    const data2 = await arrangeByLikesSortHighToLowService()
    const data3 = (await getAllBlogsService()).data.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })

    if (typeValue == "Other" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Other"))
    } else if (typeValue == "Music" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Music"))
    } else if (typeValue == "Fitness" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Fitness"))
    } else if (typeValue == "Food" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Food"))
    }
    else if (typeValue == "Travel" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Travel"))
    }

    else if (typeValue == "Politics" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Politics"))
    }

    else if (typeValue == "Sports" && valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data.filter((x) => x.Type == "Sports"))
    }


    else if (valuOfRelevance == "lowToHigh" && typeValue == "Other") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Other"))

    }
    else if (valuOfRelevance == "lowToHigh" && typeValue == "Music") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Music"))
    } else if (valuOfRelevance == "lowToHigh" && typeValue == "Fitness") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Fitness"))
    }

    else if (valuOfRelevance == "lowToHigh" && typeValue == "Politics") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Politics"))
    }
    else if (valuOfRelevance == "lowToHigh" && typeValue == "Food") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Food"))
    } else if (valuOfRelevance == "lowToHigh" && typeValue == "Travel") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Travel"))
    } else if (valuOfRelevance == "lowToHigh" && typeValue == "Sports") {
      await setstateForBlogHome(data1.data.data.filter((x) => x.Type == "Sports"))
    }
    //highToLow
    else if (valuOfRelevance == "highToLow" && typeValue == "Other") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Other"))
    }
    //Politics
    else if (valuOfRelevance == "highToLow" && typeValue == "Music") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Music"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Politics") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Politics"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Fitness") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Fitness"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Food") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Food"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Travel") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Travel"))
    }
    else if (valuOfRelevance == "highToLow" && typeValue == "Sports") {
      await setstateForBlogHome(data2.data.data.filter((x) => x.Type == "Sports"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Other") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Other"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Music") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Music"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Fitness") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Fitness"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Food") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Food"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Travel") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Travel"))
    }
    else if (valuOfRelevance == "Latest" && typeValue == "Politics") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Politics"))
    }

    else if (valuOfRelevance == "Latest" && typeValue == "Sports") {
      await setstateForBlogHome(data3.filter((x) => x.Type == "Sports"))
    }
    else if (valuOfRelevance == "Latest") {
      setstateForBlogHome(data3)
    }

    else if (valuOfRelevance == "lowToHigh") {
      await setstateForBlogHome(data1.data.data)
    }
    else if (valuOfRelevance == "highToLow") {
      await setstateForBlogHome(data2.data.data)
    }
    else if (valuOfRelevance == "All") {
      await setstateForBlogHome(data.data.data)
    }

  }

  useEffect(() => {
    getAllBlogsService()
    value(valueOfBlogType)
  }, [valuOfRelevance, valueOfBlogType])


  useEffect(() => {
    dispatch(selectTypeOfBlog("All"))
  }, [])

  return (
    <div className="dashBoardhome">
      <Header />
      <div className='dashboard-img-blogs'>
        <img src={imageForBlog} height={'330px'} width={'93.85%'} />
      </div>
      <div className='dahsboard-bcgrund-img'>

        <div className='home-main'>
          <div className='home-dash'>
            <div style={{ display: 'flex' }}>
              <NativeSelectDemo value={value} setValueOfTypeInChild={setValueOfTypeInChild} />
              <NativeSelectDemo1 value={value} setValueOfTypeInChild={setValueOfTypeInChild} />
            </div>
            <Grid container spacing={1}>
              {stateForBlogHome.map((x) => (
                <Grid item key={x._id} xs={12} sm={6} md={4} lg={4}>
                  <BlogPost
                    key={x._id}
                    obj={x}
                    id={x._id}
                    value={value}
                    Type={x.Type}
                    Id={x._id}
                    Email={x.Email}
                    date={x.createdAt}
                    Title={x.Title}
                    Views={x.Views.length}
                    Likes={x.Likes}
                    Description={x.Description}
                    NumberOfLikes={x.Likes.length}
                    imageData={x.data}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
