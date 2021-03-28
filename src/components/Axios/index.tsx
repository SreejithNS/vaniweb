import { configure } from 'axios-hooks'
import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://m10yyf9yzj.execute-api.us-east-1.amazonaws.com/'
})

export const initAxios = () => configure({ axios });

export default axios;