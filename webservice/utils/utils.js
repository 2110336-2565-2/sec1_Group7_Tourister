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

module.exports = {
    tryCatchMongooseService,
    tryCatchApiService
}
