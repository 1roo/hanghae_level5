import axios from "axios"


const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    //요청을 보내기 전 수행되는 함수
    function(config){
        console.log('interceptor요청 성공');
        return config;
    },

    //오류 요청을 보내기 전 수행되는 함수
    function(error){
        console.log('interceptor요청 오류');
        return Promise.reject(error);
    },
)


api.interceptors.response.use(
    //응답을 내보내기 전 수행되는 함수
    function(response){
        console.log('interceptor응답 받음');
        return response;
    },

    //오류 응답을 내보내기 전 수행되는 함수
    function(error){
        console.log('interceptor응답 오류');
        return Promise.reject(error)
    },
)


export default api;