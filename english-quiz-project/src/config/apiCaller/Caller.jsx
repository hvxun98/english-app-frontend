import axios from "axios"
import { getToken } from '../../utils/GetData';

export const apiCaller = async (httpReq, params, url) => {

    var response = null
    let tokenStr = getToken();

    if (httpReq === "get") {

        await axios.get(
            url,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
            .then(res => {
                response = res.data
            })
            .catch(err => {
                response = err.response;
            })
        return response
    }
    if (httpReq === "post") {
        await axios.post(
            url,
            params,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
            .then(res => {
                response = res.data
            })
            .catch(err => {
                response = err.response;
            })
        return response
    }
    else {
        throw new Error("Method not invalid")
    }
}