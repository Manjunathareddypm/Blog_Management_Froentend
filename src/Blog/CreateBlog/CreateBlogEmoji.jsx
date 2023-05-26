import { Button, Result } from 'antd';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';
import { useParams } from 'react-router-dom';
import { getPostByIdService } from '../../Services/blogs.service';
import { viewPostService } from '../../Services/blogs.service';
import { useSelector } from 'react-redux';



const CreateBlogEmoji = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const getAuthorName = useSelector((c)=>{
        return c.allBlogReducer.authorName
    })
    const handleGoDashBoardClick = () => {
        navigate('/dashboard');
    }
    const handleCreateAgain = () => {
        navigate('/createPost');
    }

    const handleClickOnViewPost = async() =>{
        const data = await getPostByIdService(id)
        await viewPostService(id,getAuthorName,data.data.data[0])
        navigate(`/detailView/${id}`)
    }

    return (
        <div>

            <Result style={{ marginTop: '100px' }}
                status="success"
                title="Successfully Created Blog Post !!!"
                subTitle="To Create the post Click On Create Again. To check how your post will look Click on View Post, Click on View Post.To see all post Click on Dashboard "
                extra={[
                    <Button type="primary" key="console" onClick={handleGoDashBoardClick}>
                        DashBoard
                    </Button>,
                    <Button onClick={handleCreateAgain} key="buy"><CreateIcon style={{ fontSize: '15px', marginRight: '3px', marginTop: '2px' }} />Create Again </Button>,
                    <Button type="primary" key="console1" onClick={handleClickOnViewPost}>
                        View Post
                    </Button>
                ]}
            />
        </div>
    );
}
export default CreateBlogEmoji;