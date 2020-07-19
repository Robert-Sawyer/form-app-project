import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://form-app-project-58266.firebaseio.com/'
});

export default instance;