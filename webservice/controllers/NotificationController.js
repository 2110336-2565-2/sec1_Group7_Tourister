const express = require("express");
const ApiErrorResponse = require("../exception/ApiErrorResponse");
const Notification = require("../models/Notification");
const { tryCatchMongooseService } = require("../utils/utils");
const bcrypt = require("bcrypt");

const NotificationController = {
  /**
   * getNotificationById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getNotificationById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const notificationId = req.params.id;
      const notification = await Notification.findById(notificationId);

      return {
        code: 200,
        data: notification,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllNotifications
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllNotifications(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const notifications = await Notification.find({});

      return {
        code: 200,
        data: notifications,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * createNotification
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async createNotification(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const payload = req.body;
      const notification = new Notification(payload);
      await notification.save();
      console.log(notification);
      return {
        code: 201,
        data: notification,
        message: "notification created",
      };
    });
    res.json(result);
  },

  /**
   * updateNotificationById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async updateNotificationById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const notificationId = req.params.id;
      const payload = req.body;
      await Notification.findByIdAndUpdate(notificationId, { $set: payload });
      const updatedNotification = await Notification.findById(notificationId);
      return {
        code: 204,
        data: updatedNotification,
        message: "notification updated",
      };
    });
    res.json(result);
  },

  /**
   * deleteNotificationById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async deleteNotificationById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const notificationId = req.params.id;
      const notification = await Notification.findByIdAndDelete(notificationId);

      return {
        code: 200,
        data: notification,
        message: "notification deleted",
      };
    });
    res.json(result);
  },

  /**
   * getAllNotifications
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllNotificationsByUserId(req, res, next) {
    const userId = req.params.userId;
    const filterBody = req.query;
    console.log(filterBody);
    let filter = [];
    filter.push({ user: userId });

    const result = await tryCatchMongooseService(async () => {
      const notifications = await Notification.find({ $and: filter });

      return {
        code: 200,
        data: notifications,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllNotifications
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllPublishedNotificationsByUserId(req, res, next) {
    const userId = req.params.userId;
    const filterBody = req.query;
    console.log(filterBody);
    let filter = [];
    filter.push({ user: userId, notifyTime: { $lte: Date.now() } });
    let sorter = { notifyTime: -1 };

    const result = await tryCatchMongooseService(async () => {
      const notifications = await Notification.find({ $and: filter }).sort(
        sorter
      );

      return {
        code: 200,
        count: notifications.length,
        data: notifications,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllNotifications
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async readAllPublishedNotificationsByUserId(req, res, next) {
    const userId = req.params.userId;
    const filterBody = req.query;
    console.log(filterBody);
    let filter = [];
    filter.push({ user: userId, notifyTime: { $lte: Date.now() } });
    let sorter = { notifyTime: -1 };

    const result = await tryCatchMongooseService(async () => {
      const notifications = await Notification.find({ $and: filter }).sort(
        sorter
      );

      notifications.forEach(async (notification) => {
        await Notification.findByIdAndUpdate(notification._id, {
          $set: { isRead: true },
        });
      });

      const updatednotifications = await Notification.find({
        $and: filter,
      }).sort(sorter);

      return {
        code: 200,
        data: updatednotifications,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * readNotificationById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async readNotificationById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const notificationId = req.params.id;
      await Notification.findByIdAndUpdate(notificationId, {
        $set: { isRead: true },
      });
      const updatedNotification = await Notification.findById(notificationId);
      return {
        code: 204,
        data: updatedNotification,
        message: "notification updated",
      };
    });
    res.json(result);
  },
};

module.exports = NotificationController;
