const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const docUtils = require('../utils/docUtils');

const Group = require('../models/groupModel');
const Post = require('../models/postModel');

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
  // @route GET /api/v1/groups
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

  // @desc delete specific post
  // @route DELETE /api/v1/groups/:id
  // @access public
  static deleteGroup = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const group = await docUtils.deleteDoc(Group, id, next);
    if (!group) return;
    res.status(204).send();
  });

  // @desc get all members for specific group
  // @route GET /api/v1/groups/:id/members
  // @access public
  static getAllmembers = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const group = await docUtils.getlDocById(Group, id, next);
    if (!group) return;
    res.status(200).json({ data: group.members });
  });

  // @desc add a user for group.
  // @route POST /api/v1/groups/:id/members/:userId
  // @access public
  static addUserToGroup = asyncHandler(async(req, res, next) => {
    const { id, userId } = req.params;
    const query = { $push: { 'members': { userId } } };
    const group = await docUtils.updateDoc(Group, id, query, next);
    if (!group) return;
    res.status(201).json({ data: group.members });
  });

  // @desc delete a user from group.
  // @route DELETE /api/v1/groups/:id/members/:userId
  // @access public
  static deleteUserFromGroup = asyncHandler(async(req, res, next) => {
    const { id, userId } = req.params;
    const query = { $pull: { 'members': { userId } } };
    const group = await docUtils.updateDoc(Group, id, query, next);
    if (!group) return;
    res.status(204).send();
  });


  // @desc get all members for specific group
  // @route GET /api/v1/groups/:id/posts
  // @access public
  static getAllPosts = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const group = await docUtils.getlDocById(Group, id, next);
    if (!group) return;
    res.status(200).json({ data: group.posts });
  });

  // @descadd post in the group
  // @route POST /api/v1/groups/:id/posts
  // @access public
  static addPostToGroup = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    req.body.userId = req.user._id;
    const post = await docUtils.createDoc(Post, req.body);
    const query = { $push: { 'posts': post._id } };
    const group = await docUtils.updateDoc(Group, id, query, next);
    if (!group) return;
    res.status(201).json({ data: group.posts });
  });

  // @desc add a user for group.
  // @route GET /api/v1/groups/:id/posts/:postId
  // @access public
  static getPostFromGroup = asyncHandler(async(req, res, next) => {
    const { id, postId } = req.params;
    let group = await docUtils.getlDocByIdPop(Group, id, 'posts', next);
    if (!group) return;
    const post = group.posts.find(post => post._id.toString() === postId);
    if (!post) {
      next(new ApiError('Not found', 404));
      return;
    }
    res.status(200).json({ data: post});
  });
}

module.exports = groupControllers;
