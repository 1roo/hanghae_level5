import axios from "axios";


const api2 = axios.create({
    baseURL: "http://localhost:3001",
})

export const getComments = async (quizId) => {
    const response = await api2.get(`/comments?quizId=${quizId}`);
    return response.data;
};

export const addComment = async (commentData) => {
    const response = await api2.post("/comments", commentData);
    return response.data;
};

export const updateComment = async (id, updatedComment) => {
    const response = await api2.put(`/comments/${id}`, updatedComment);
    return response.data;
};

export const deleteComment = async (id) => {
    const response = await api2.delete(`/comments/${id}`);
    return response.data;
};


export default api2;