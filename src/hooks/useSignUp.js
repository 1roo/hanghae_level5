import { useMutation } from 'react-query';
import api2 from '../axios/api2';

const useSignUp = () => {
    const signUpMutation = useMutation((userData) => api2.post("/register", userData));

    const signUpHandler = async (userData) => {
        try {
            await signUpMutation.mutateAsync(userData);
            alert('회원가입에 성공했습니다.');
        } catch (error) {
            alert('회원가입에 실패했습니다. 오류 메시지: ' + error.message);
        }
    };

    return { signUpHandler, isLoading: signUpMutation.isLoading };
};

export default useSignUp;