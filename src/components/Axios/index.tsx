import { configure } from 'axios-hooks'
import Axios from 'axios'

const axios = Axios.create({
    //baseURL: 'https://m10yyf9yzj.execute-api.us-east-1.amazonaws.com/'
    baseURL: 'https://c5040795-ff8d-4e5a-9831-65b87e682339.mock.pstmn.io/'
})

export const initAxios = () => configure({ axios });

export default axios;