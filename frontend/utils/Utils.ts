export const isHttpStatusOk = (code: number) => {
    return Math.floor(code / 100) == 2
}

export const nullSafeString = (s: string | number | null | undefined, defaultVal="") => {
    if(s == null) return defaultVal
    else return s.toString()
}