import { useNavigate } from "react-router-dom";

const apiHelper = (data, next) => {
    const navigate = useNavigate();
    const { status } = data;

    if (status === 401) {
        console.log('Unauthorized');
        navigate('/user/login');
    }

    if (status === 200) {
        console.log('Success');
        next();
    }

    if (status === 400) {
        console.log('Error');
        return null;
    }

    if (status === 404) {
        console.log('Not Found');
        return null;
    }

    if (status === 500) {
        console.log('Internal Server Error');
        return null;
    }
}

module.exports = apiHelper