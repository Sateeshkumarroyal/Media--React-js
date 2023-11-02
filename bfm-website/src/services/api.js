
import axios from 'axios';

const apiUrl = 'https://bfmcms.s3.ap-southeast-1.amazonaws.com/api/tests/main.json';

const apiService = axios.create({
  baseURL: apiUrl,
});

export default apiService;
