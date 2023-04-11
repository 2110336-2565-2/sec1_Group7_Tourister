const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/NotificationController')
const { authGuide } = require('../middlewares/auth')

router.get('/notification', notificationController.getAllNotifications)
router.get('/notification/notify/:userId', notificationController.getAllPublishedNotificationsByUserId)
router.get('/notification/:id', notificationController.getNotificationById)
router.put('/notification/read/:userId', notificationController.readAllPublishedNotificationsByUserId)
router.post('/notification', notificationController.createNotification)
router.put('/notification/:id', notificationController.updateNotificationById)
router.delete('/notification/:id', notificationController.deleteNotificationById)

module.exports = router

/**
 * @swagger
 * components:
 *      schemas:
 *          Notification:
 *              type: object
 *              required:
 *                  - userid
 *                  - type
 *                  - title
 *              properties:
 *                  id:
 *                      type: string
 *                      format: uuid
 *                      description: The auto-generated id of the Notification
 *                      example: 123e4567-e89b-12d3-a456-426614174000
 *                  user:
 *                      type: string
 *                      description: The Id of the user who the notification is for
 *                  type:
 *                      type: string
 *                      description: The type of notification
 *                      enum:
 *                          - newrequest
 *                          - accrequest
 *                          - decrequest
 *                          - nexttrip
 *                          - endtrip
 *                          - coin
 *                          - payment
 *                          - refund
 *                          - cancel
 *                  title:
 *                      type: string
 *                      description: The title of the notification
 *                  message:
 *                      type: string
 *                      description: The message body of the notification
 *                  notifyTime:
 *                      type: Date
 *                      description: The time the notification was sent
 *                  isRead:
 *                      type: Boolean
 *                      description: Whether or not the notification has been read
 *                  program:
 *                      type: string
 *                      description: The Id for the program which this notification is for
 *              example:
 *                  id: 6432696d2e242ebede1d88dd
 *                  user: 63fdda63e748bfc47d0100ca
 *                  type: nexttrip
 *                  title: Upcoming Trip
 *                  message: Wonderful Bangkok will start today at 09:00. Meeting point at Airport. Get Ready!
 *                  notifyTime: 2023-04-09T17:00:00.000Z
 *                  isRead: false
 */

/**
 * @swagger
 * tags:
 *      name: Notifications
 *      description: The notifications managing API
 */

/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of all notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notification/notify/{userId}:
 *   get:
 *     summary: Get all published notifications for a specific user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve notifications for
 *     responses:
 *       200:
 *         description: List of published notifications for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       404:
 *         description: The specified user does not exist or has no published notifications
 */

/**
 * @swagger
 * /notification/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the notification to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The notification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /notification/read/{userId}:
 *   put:
 *     summary: Mark all published notifications as read for a specific user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to mark notifications as read
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully marked notifications as read
 *       '400':
 *         description: Invalid user ID provided
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /notification:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       '201':
 *         description: Successfully created a new notification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '400':
 *         description: Invalid notification data provided
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /notification/{id}:
 *   put:
 *     summary: Update a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       '200':
 *         description: Successfully updated the notification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '400':
 *         description: Invalid notification ID or data provided
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /notification/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successfully deleted the notification
 *       '400':
 *         description: Invalid notification ID provided
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */