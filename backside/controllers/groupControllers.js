const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const docUtils = require('../utils/docUtils');

const Group = require('../models/groupModel');

class groupControllers {
  // @desc create group
  // @route POST /api/v1/groups
  // @access public
  static createGroup = asyncHandler(async (req, res, next) => {
    req.body.members = {
      userId: req.user._id,
      role: 'admin',
    }
    const group = await docUtils.createDoc(Group, req.body, next);
    if (!group) return;
    res.status(201).json({ data: group });
  });

  // @desc get all groups
  // @route POST /api/v1/groups
  // @access public
  static getAllGroups = asyncHandler(async(req, res) => {
    const groups = await docUtils.getDocs(Group, {}, req);
    res.status(200).json({ 
      results: groups.docs.length, page: groups.page, data: groups.docs
    });
  });

  // @desc get list for all posts for user
  // @route GET /api/v1/groups/me
  // @access public
  static getGroups = asyncHandler(async(req, res) => {
    const { docs, page } = await docUtils.getDocs(Group, { 'members.userId': req.user._id }, req);
    res.status(200).json({ results: docs.length, page, data: docs});
  });

  // @desc get specific group
  // @route GET /api/v1/groups/:id
  // @access public
  static getGroupById = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const group = await docUtils.getlDocById(Group, id, next);
    if (!group) return;
    res.status(200).json({ data: group});
  });

  // @desc update specific Group
  // @route PUT /api/v1/groups/:id
  // @access public
  static updateGroup = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const group = await docUtils.updateDoc(Group, id, req.body, next);
    if (!group) return;
    res.status(200).json({ data: group});
  });


}

module.exports = groupControllers;
