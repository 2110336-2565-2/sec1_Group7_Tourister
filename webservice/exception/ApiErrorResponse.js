class ApiErrorResponse extends Error {
    code;
    label;
  
    /**
     * @param {string} message
     * @param {number} code 
     */
    constructor(message, code, tag="") {
      super(message);
      this.code = code;
      this.tag = tag;
      Object.setPrototypeOf(this, ApiErrorResponse.prototype);
    }
  
    getData() {
      return {
        code: this.code,
        message: this.message,
        tag: e.tag
      }
    }
  }
  
  module.exports = ApiErrorResponse