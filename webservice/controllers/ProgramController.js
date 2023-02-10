const express = require('express')
const ApiErrorResponse = require('../exception/ApiErrorResponse')
const Program = require("../models/Program")
const { tryCatchMongooseService } = require('../utils/utils')
const bcrypt = require('bcrypt')

const ProgramController = {
    /**
     * getProgramById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async getProgramById(req, res, next) {
        const result = await tryCatchMongooseService( async () => {
            const programId = req.params.id
            const program = await Program.findById(programId)

            return {
                code: 200,
                data: program,
                message: "",
            }
        })
        res.json(result)
    },

    /**
     * getAllPrograms
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async getAllPrograms(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const programs = await Program.find({})

            return {
                code: 200,
                data: programs,
                message: "",
            }
        })
        res.json(result)
    },

    /**
     * createProgram
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async createProgram(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const payload = req.body
            const program = new Program(payload);
            await program.save()
            return {
                code: 201,
                data: program, 
                message: "program created"
            }
        })
        res.json(result)
    },

    /**
     * updateProgramById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async updateProgramById(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const programId = req.params.id
            const payload = req.body
            await Program.findByIdAndUpdate(programId, { $set: payload })
            const updatedProgram = await Program.findById(programId)
            return {
                code: 204,
                data: updatedProgram,
                message: "program updated"
            }
        }) 
        res.json(result)
    },

    /**
     * deleteProgramById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async deleteProgramById(req, res, next) {
        const result = await tryCatchMongooseService (async () => {
            const programId = req.params.id
            const program = await Program.findByIdAndDelete(programId)

            return {
                code: 200,
                data: program,
                message: "program deleted",
            }
        })
        res.json(result)
    },
}

module.exports = ProgramController