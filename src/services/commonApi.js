import axios from "axios";

export const commonApi=async(method,url,data,header)=>{
    let config={
        url,
        method,
        data,
        headers:header?header:{
            "content-type":"application/json"
        }
    }

    return await axios (config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })
}