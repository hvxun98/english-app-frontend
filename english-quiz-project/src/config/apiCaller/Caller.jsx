import axios from "axios"

export const apiCaller = async (httpReq, params, url) => {

    var response = null
    let tokenStr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYyNjA1ODg1MywiZXhwIjoxNjI2NjYzNjUzfQ.-STtHL2Ti3DDy2Pt_v9MnWQnust8ceqat6obg-ZB998"

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