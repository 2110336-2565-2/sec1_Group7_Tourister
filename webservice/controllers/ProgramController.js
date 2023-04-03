const express = require("express");
const ApiErrorResponse = require("../exception/ApiErrorResponse");
const Program = require("../models/Program");
const { tryCatchMongooseService } = require("../utils/utils");
const bcrypt = require("bcrypt");
const { queryObjToProgramFilter } = require("../utils/queryToMongooseFilter");
const Notification = require("../models/Notification");

const ProgramController = {
  /**
   * getProgramById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getProgramById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const programId = req.params.id;
      const program = await Program.findById(programId).populate({
        path: "guide",
        select: "name surname",
      });

      return {
        code: 200,
        data: program,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllPrograms
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllPrograms(req, res, next) {
    const filterBody = req.query;
    const { filter, sorter } = queryObjToProgramFilter(filterBody);

    const result = await tryCatchMongooseService(async () => {
      const programs = await Program.find({ $and: filter })
        .sort(sorter)
        .populate({
          path: "guide",
          select: "name surname",
        });

      return {
        code: 200,
        data: programs,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * createProgram
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async createProgram(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const payload = req.body;
      const program = new Program(payload);
      await program.save();
      console.log(program);
      
      return {
        code: 201,
        data: program,
        message: "program created",
      };
    });
    res.json(result);
  },

  /**
   * updateProgramById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async updateProgramById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const programId = req.params.id;
      const program = await Program.findById(programId);
      const payload = req.body;
      await Program.findByIdAndUpdate(programId, { $set: payload });
      const updatedProgram = await Program.findById(programId);

      //Nofify guide
      if (!program.published && updatedProgram.published){
        const noti_trip = new Notification({
          user: updatedProgram.guide,
          type: "nexttrip",
          title: "Upcoming Trip",
          message: `${updatedProgram.name} will start today at ${updatedProgram.startTime}. Meeting point at ${updatedProgram.meetLocation}. Get Ready!`,
          notifyTime: updatedProgram.startDate,
        });
        await noti_trip.save();
        console.log(noti_trip);
      }

      return {
        code: 204,
        data: updatedProgram,
        message: "program updated",
      };
    });
    res.json(result);
  },

  /**
   * deleteProgramById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async deleteProgramById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const programId = req.params.id;
      const program = await Program.findByIdAndDelete(programId);

      return {
        code: 200,
        data: program,
        message: "program deleted",
      };
    });
    res.json(result);
  },

  /**
   * getAllPrograms
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllProgramsByUserId(req, res, next) {
    const userId = req.params.userId;
    const filterBody = req.query;
    let { filter, sorter } = queryObjToProgramFilter(filterBody);
    filter.push({ guide: userId });

    const result = await tryCatchMongooseService(async () => {
      const programs = await Program.find({ $and: filter })
        .sort(sorter)
        .populate({
          path: "guide",
          select: "name surname",
        });

      return {
        code: 200,
        data: programs,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllPrograms
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllPublishedProgramsByUserId(req, res, next) {
    const userId = req.params.userId;
    const filterBody = req.query;
    let { filter, sorter } = queryObjToProgramFilter(filterBody);
    filter.push({ guide: userId, published: true });

    const result = await tryCatchMongooseService(async () => {
      const programs = await Program.find({ $and: filter })
        .sort(sorter)
        .populate({
          path: "guide",
          select: "name surname",
        });

      return {
        code: 200,
        data: programs,
        message: "",
      };
    });
    res.json(result);
  },
  /**
   * getAllPrograms
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllDraftProgramsByUserId(req, res, next) {
    const userId = req.params.userId;
    const filterBody = req.query;
    let { filter, sorter } = queryObjToProgramFilter(filterBody);
    filter.push({ guide: userId, published: false });

    const result = await tryCatchMongooseService(async () => {
      const programs = await Program.find({ $and: filter })
        .sort(sorter)
        .populate({
          path: "guide",
          select: "name surname",
        });

      return {
        code: 200,
        data: programs,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllPrograms
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllPublishedPrograms(req, res, next) {
    const filterBody = req.query;
    let { filter, sorter } = queryObjToProgramFilter(filterBody);
    let todaydate = new Date()
    todaydate.setHours(0, 0, 0, 0);
    filter.push({ published: true, startDate: {$gte: todaydate} });

    const result = await tryCatchMongooseService(async () => {
      const programs = await Program.find({ $and: filter })
        .sort(sorter)
        .populate({
          path: "guide",
          select: "name surname image",
        });

      return {
        code: 200,
        count: programs.length,
        data: programs,
        message: "",
      };
    });
    res.json(result);
  },
};

module.exports = ProgramController;
