const ApiErrorResponse = require("../exception/ApiErrorResponse");

/**
 * @param {() => Promise<{code: number, message?: string, data?: unknown }>} callback 
 * @param {((error: unknown) => unknown) | undefined} catchCallback 
 * @param {(() => unknown) | undefined} finallyCallback 
 * @returns {Promise<{code: StatusCode, message?: string, data?: unknown, errors?: unknown }>}
 */
const tryCatchMongooseService = async (callback, catchCallback = undefined, finallyCallback = undefined) => {
    return callback().catch(e => {
      console.error('\n\nError caught by tryCatchMongooseService:', e);
      if (typeof catchCallback === 'function') catchCallback(e);
      if (e.name == "CastError") {
        return {
            code: 400,
            message: "mongoose casting error, possibly id param",
            errors: e.stack
        }
      }
      else if( e.name == "ValidationError") {
        return {
            code: 400,
            message: "invalid inputs",
            errors: e.stack
        }
      }
      else if(e instanceof ApiErrorResponse){
        return {
            code: e.code,
            message: e.message,
            tag: e.tag,
            errors: e.stack
        }
      }
      else if (e instanceof Error) {
        return {
          code: 500,
          message: "something went wrong: " + e,
          errors: e.stack
        }
      } else {
        throw e;
      }
    }).finally(() => typeof finallyCallback === 'function' && finallyCallback());
}

/**
 * @param {() => Promise<{code: number, message?: string, data?: unknown }>} callback 
 * @param {((error: unknown) => unknown) | undefined} catchCallback 
 * @param {(() => unknown) | undefined} finallyCallback 
 * @returns {Promise<{code: StatusCode, message?: string, data?: unknown, errors?: unknown }>}
 */
const tryCatchApiService = async (callback, catchCallback = undefined, finallyCallback = undefined) => {
  return callback().catch(e => {
    console.error('\n\nError caught by tryCatchMongooseService:', e);
    if (typeof catchCallback === 'function') catchCallback(e);

    else if(e instanceof ApiErrorResponse){
      return {
          code: e.code,
          message: e.message,
          tag: e.tag,
          errors: e.stack
      }
    }
    else if (e instanceof Error) {
      return {
        code: 500,
        message: "something went wrong: " + e,
        errors: e.stack
      }
    } else {
      throw e;
    }
  }).finally(() => typeof finallyCallback === 'function' && finallyCallback());
}

const getSecsDiff = (date1, date2) => {
  return Math.abs(date1 - date2) / 1000;
}

const getTodayDateYYYY_MM_DD = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

const getYesterDayDateYYYY_MM_DD = (yyyymmdd) => {
  const days_in_month = [31,28,31,30,31,30,31,31,30,31,30,31];
  const [yyyy, mm, dd] = yyyymmdd.split('-');
  yyyy = parseInt(yyyy);
  mm = parseInt(mm);
  dd = parseInt(dd);
  if(dd-1 == 0){
    if(mm-1 == 0){
      return (yyyy-1) + '-' + 12 + '-' + days_in_month[11];
    }
    return yyyy + '-' + (mm-1) + '-' + days_in_month[mm-2];
  }
}

module.exports = {
    tryCatchMongooseService,
    tryCatchApiService,
    getSecsDiff,
    getTodayDateYYYY_MM_DD,
    getYesterDayDateYYYY_MM_DD,
}
