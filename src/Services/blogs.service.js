import axios from 'axios'
const token = localStorage.getItem('token')

let headerConfig = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}
const url = "http://localhost:4000/api/v1/";



export const signedup = async (obj) => {
    let response = await axios.post(url + "users", obj)
    return response
}

export const signedin = async (obj) => {
    let response = await axios.post(url + "users/login", obj)
    return response
}



export async function getAllBlogsService() {
    let response = await axios.get(url + "post")
    return response
}

export async function deleteBlogsService(id) {
    let response = await axios.delete(url + "post/deletePost/" + id, headerConfig)
    return response
}

export async function createPostService(id, imgageUrl) {
    if (imgageUrl) {
        id.data = imgageUrl;
    }

    let response = await axios.post(url + "post", id, headerConfig)
    return response
}


export async function updatePostService(id, obj, imageUrl) {
    if (imageUrl) {
        obj.data = imageUrl
    }
    let response = await axios.put(url + "post/editpost/" + id, obj, headerConfig)
    return response
}


export async function viewPostService(id, email, obj) {
    let response = await axios.post(`${url}post/${id}/viewPost/${email}`, obj, headerConfig)
   
    return response
}

export async function getPostByIdService(id) {
    let response = await axios.get(`${url}post/getPostById/${id}`, headerConfig)
    return response
}

export async function getEmailOfUser() {
    let response = await axios.get(url + "users/getUserEmail", headerConfig)
    return response
}



export async function findMyPost(email) {
    let response = await axios.get(url + "post/findMyPost/" + email, headerConfig)
    return response
}

export async function findLikedPost(email) {
    let response = await axios.get(url + "post/findMyLikedPost/" + email, headerConfig)
    return response
}



export async function likeButtonService(id, email, obj) {
    let response = await axios.put(url + "post/" + id + "/like/" + email, obj, headerConfig)
    return response
}


export async function arrangeByLikesSortHighToLowService() {
    let response = await axios.get(url + "post/arrangeByLikesSortHighToLow", headerConfig)
    return response
}


export async function arrangeByLikesSortLowToHigh() {
    let response = await axios.get(url + "post/arrangeByLikesSortLowToHigh", headerConfig)
    return response
}



export async function postComments(parentId, authorName, obj) {
    let response = await axios.post(url + "post/comment/" + parentId + "/" + authorName, obj, headerConfig)
    return response
}

export async function findAllComments(parentId) {
    let response = await axios.get(url + "post/comment/" + parentId, headerConfig)
    return response
}



export async function deleteComment(parentId) {
    let response = await axios.delete(url + "post/comment/" + parentId, headerConfig)
    return response
}


export async function sendEmailForComment(authorName, obj, commentAuthor,Title) {
    let response = await axios.post(url + "post/sendEmail/" + authorName + "/" + commentAuthor+"/"+Title, obj, headerConfig)
    console.log(url + "post/sendEmail/" + authorName + "/" + commentAuthor+"/"+Title);
    return response
}


export async function replyToComment(authorName, obj, commentId, blogId) {
    let response = await axios.post(url + "post/replyComment/" + authorName + "/" + commentId + "/" + blogId, obj, headerConfig)
    return response
}

export async function collectAllReplies() {
    let response = await axios.get(url + "post/getAllReply", headerConfig)
    return response
}

export async function deleteReply(id) {
    let response = await axios.delete(url + "post/deleteReply/" + id, headerConfig)
    return response
}

export async function getIndividualReplyNumber(id) {
    let response = await axios.get(url + "post/getIndividiualReply/" + id, headerConfig)
    return response
}


export async function getReplyToNumber(id) {
    let response = await axios.get(url + "post/getReplyToNumber/" + id, headerConfig)
    return response
}

export async function likeComment(id, email) {
    let response = await axios.put(url + "post/" + id + "/likeComment/" + email, headerConfig)
    return response
}


export async function likeCommentReplyService(id, email) {
    let response = await axios.put(url + "post/" + id + "/likeReplyOfComment/" + email, headerConfig)
    return response
}

export async function getParticularComment(id) {
    let response = await axios.get(url + "post/getParticularComment/" + id, headerConfig)
    return response
}


export async function getParticularReplyComment(id) {
    let response = await axios.get(url + "post/getParticularReplyComment/" + id, headerConfig)
    return response
}

