export const isHttpStatusOk = (code: number) => {
    return Math.floor(code / 100) == 2
}

export const nullSafeString = (s: string | number | null | undefined, defaultVal="") => {
    if(s == null) return defaultVal
    else return s.toString()
}

export const addHoursToDate = (d: Date, h: number) => {
    d.setTime(d.getTime() + (h*60*60*1000));
    return d
}

export const isDateTimeInThePass = (d: Date, t: string) => {
    const date = new Date(d);
    const [hour,minute] = t.split(":").map((t)=>Number(t))
    const currentDate = new Date();
    if(date.getFullYear() < currentDate.getFullYear()){
        return true;
    } else if (date.getFullYear() === currentDate.getFullYear()){
        if(date.getMonth() < currentDate.getMonth()){
            return true;
        }else if (date.getMonth() === currentDate.getMonth()){
            if(date.getDate() < currentDate.getDate()){
                return true;
            } else if (date.getDate()===currentDate.getDate()){
                if(hour < currentDate.getHours()){
                    return true;
                } else if (hour === currentDate.getHours()){
                    if(minute < currentDate.getMinutes()){
                        return true;
                    }
                }
            }
        }
    } 
    return false;
} 