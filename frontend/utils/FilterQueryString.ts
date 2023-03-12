
export const filterObjectToQueryString = (obj: any) => {
    let q = ""
    Object.keys(obj).forEach((k) => {
        if(obj[k] != null) {
            if(typeof obj[k] === "string" || typeof obj[k] === "number" || typeof obj[k] === "boolean" )q += `${k}=${obj[k]}&`
            else if(Array.isArray(obj[k])) q += obj[k].join('+') + "&"
            else if(typeof obj[k] === "object" && Object.prototype.toString.call(obj[k]) === '[object Date]') q += `${k}=${obj[k].toISOString()}&`
        } 
    })
    if(q.length > 0) return q.slice(0,q.length-1)
    else return q
}
