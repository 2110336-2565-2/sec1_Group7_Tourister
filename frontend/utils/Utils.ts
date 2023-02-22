export const isHttpStatusOk = (code: number) => {
    return Math.floor(code / 100) == 2
}

export const nullSafeString = (s: string | number | null | undefined, defaultVal="") => {
    if(s == null) return defaultVal
    else return s.toString()
}

export const filterObjectToQueryString = (obj: any) => {
    let q = ""
    Object.keys(obj).forEach((k) => {
        if(obj[k] != null) q += `${k}=${obj[k]}&`
    })
    if(q.length > 0) return q.slice(0,q.length-1)
    else return q
}

export const addHoursToDate = (d: Date, h: number) => {
    d.setTime(d.getTime() + (h*60*60*1000));
    return d
}