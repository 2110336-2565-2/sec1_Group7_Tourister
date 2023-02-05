class ApiErrorResponse extends Error {
    code;
  
    /**
     * @param {string} message
     * @param {number} code 
     */
    constructor(message, code) {
      super(message);
      this.code = code;
      Object.setPrototypeOf(this, ApiErrorResponse.prototype);
    }
  
    getData() {
      return {
        code: this.code,
        message: this.message,
      }
    }
  }
  
  module.exports = ApiErrorResponse