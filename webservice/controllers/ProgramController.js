const express = require("express");
const ApiErrorResponse = require("../exception/ApiErrorResponse");
const Program = require("../models/Program");
const { tryCatchMongooseService } = require("../utils/utils");
const bcrypt = require("bcrypt");
const { queryObjToProgramFilter } = require("../utils/queryToMongooseFilter");
const Notification = require("../models/Notification");
const { uploadImage } = require("../services/uploadImageService");

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
      if(!payload.name) throw new ApiErrorResponse("please specify name", 400)
      if(!payload.price) throw new ApiErrorResponse("please specify price", 400)
      if(payload.price<0) throw new ApiErrorResponse("price cannot be negative", 400)
      if(!payload.startDate) throw new ApiErrorResponse("please specify start date", 400)
      if(!payload.endDate) throw new ApiErrorResponse("please specify end date", 400)
      if(payload.endDate<payload.startDate) throw new ApiErrorResponse("end date cannot be before start date", 400)
      if(!payload.max_participant) throw new ApiErrorResponse("please specify max participant", 400)
      if(!payload.province) throw new ApiErrorResponse("please specify province", 400)
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
      if (!program.published && updatedProgram.published) {
        const now = new Date(); // current time
        let startdate = program.startDate;
        startdate.setHours(0, 0, 0, 0);
        const notifyTime = startdate < now ? now : startdate;
        const noti_trip = new Notification({
          user: updatedProgram.guide,
          type: "nexttrip",
          title: "Upcoming Trip",
          message: `${updatedProgram.name} will start today at ${updatedProgram.startTime}. Meeting point at ${updatedProgram.meetLocation}. Get Ready!`,
          notifyTime: notifyTime,
          program: program,
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
    let todaydate = new Date();
    todaydate.setHours(0, 0, 0, 0);
    filter.push({ published: true, startDate: { $gte: todaydate } });

    const result = await tryCatchMongooseService(async () => {
      const programs = await Program.find({ $and: filter })
        .sort(sorter)
        .populate({
          path: "guide",
          select: "name surname profilePic",
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

  /**
     * upload photos
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
  async uploadProgramPhotos(req, res, next) {
    const result = await tryCatchMongooseService (async () => {
        const imageFiles = req.files
        console.log(imageFiles)
        console.log(req.body)            

        return {
            code: 200,
            data: {},
            message: "photos received",
        }
    })
    res.json(result)
  },

  /**
     * uploadProgramPhotosByProgramId
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
  async uploadProgramPhotosByProgramId(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const imageFiles = req.files
      console.log(imageFiles) 

      const programId = req.params.id;
      const programDoc = await Program.findById(programId);
      const program = programDoc.toObject();

      let pos = 0;
      const attractionsAmt = program.dayTrips.reduce((acc, dayTrip) => {
        return acc + dayTrip.attractions.length;
      }, 0);
      if(attractionsAmt !== imageFiles.length) {
        throw new ApiErrorResponse("number of images does not match number of attractions", 400)
      }

      for(let i=0; i<program.dayTrips.length; i++) {
        for(let j=0; j<program.dayTrips[i].attractions.length; j++) {
          if (pos < imageFiles.length) {
            const uploadResult = await uploadImage(imageFiles[pos])
            if(uploadResult.status === 'failed' || uploadResult.response?.image?.url == null) {
                console.log(uploadResult)
                throw new ApiErrorResponse("upload failed: " + uploadResult.message, 500)
            }
            const imgUrl = uploadResult.response.image.url
            program.dayTrips[i].attractions[j].image = imgUrl
            pos++
          } 
        }
      }

      program.published = true;

      await Program.findByIdAndUpdate(programId, { $set: program });
      const updatedProgram = await Program.findById(programId);

      return {
        code: 204,
        data: updatedProgram,
        message: "program photos uploaded and published",
      };
    });
    res.json(result);
  },

};

module.exports = ProgramController;
