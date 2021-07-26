import axios from "axios"

export const apiCaller = async (httpReq, params, url) => {

    var response = null
    let tokenStr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYyNjg1Nzc0MywiZXhwIjoxNjI3NDYyNTQzfQ.C9hmeWvHvaz3pC9lnWefR5oO3lJj4vLR8vVnTevBWOI"

    if (httpReq === "get") {

        await axios.get(
            url,
            {
                headers: {
                    "Authorization": `Bearer ${tokenStr}`
                }
            })
            .then(res => {
                console.log(res);
                response = res.data
            })
            .catch(err => {
                response = err
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
                console.log(res);
                response = res.data
            })
            .catch(err => {
                response = err
            })
        return response
    }
    else {
        throw new Error("Method not invalid")
    }
}