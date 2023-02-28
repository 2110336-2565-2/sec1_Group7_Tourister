
export const filterObjectToQueryString = (obj: any) => {
    let q = ""
    Object.keys(obj).forEach((k) => {
        if(obj[k] != null) {
            if(typeof obj[k] === "string" || typeof obj[k] === "number" || typeof obj[k] === "boolean")q += `${k}=${obj[k]}&`
            else if(Array.isArray(obj[k])) q += obj[k].join('+') + "&"
        } 
    })
    if(q.length > 0) return q.slice(0,q.length-1)
    else return q
}
