const { default: axios } = require('axios')
const FormData = require('form-data')

/** 
 * @param {FileType} imgFile
 */
const uploadImage = async (imgFile) => {
    const key = process.env.IMGBB_API_KEY
    let data = new FormData()
    data.append('image', imgFile.buffer, imgFile.originalname)
    try {
        const axios_res = await axios.post(`https://api.imgbb.com/1/upload?key=${key}`, data,  {  headers: data.getHeaders() })
        const result = axios_res.data
        if(!result.success) {
            throw new Error(result.error.message)
        }
        return {
            status: 'success',
            response: result.data,
            message: 'upload success'
        }
    } catch(err) {
        console.log(err)
        return {
            status: 'failed',
            message: err.message,
        }
    }
}

module.exports = { 
    uploadImage
}