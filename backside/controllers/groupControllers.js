const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const docUtils = require('../utils/docUtils');
const postUtils = require('../utils/postUtils');
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

  // @descadd add post in the group
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

  // @desc get post for group.
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

  // @desc edit a post in group.
  // @route PUT /api/v1/groups/:id/posts/:postId
  // @access public
  static updatePostFromGroup = asyncHandler(async(req, res, next) => {
    const { postId } = req.params;
    const post = await docUtils.updateDoc(Post, postId, req.body, next);
    if (!post) return;
    res.status(200).json({ data: post});
  });

  // @desc edit a post in group.
  // @route DELETE /api/v1/groups/:id/posts/:postId
  // @access public
  static deletePostFromGroup = asyncHandler(async(req, res, next) => {
    const { id, postId } = req.params;
    const query = { $pull: { 'posts': postId } };
    const group = await docUtils.updateDoc(Group, id, query, next);
    if (!group) return;
    const post = await docUtils.deleteDoc(Post, postId, next);
    if (!post) return;
    res.status(204).send();
  });

  // @desc get all requests for specific group
  // @route GET /api/v1/groups/:id/requests
  // @access public
  static getAllRequests = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const group = await docUtils.getlDocById(Group, id, next);
    if (!group) return;
    res.status(200).json({ data: group.requests });
  });

  // @desc  Send a join request to a group.
  // @route POST /api/v1/groups/:id/requests/:userId
  // @access public
  static sendRequestGroup = asyncHandler(async(req, res, next) => {
    const { id, userId } = req.params;
    const query = { $push: { 'requests': userId } };
    const group = await docUtils.updateDoc(Group, id, query, next);
    if (!group) return;
    res.status(201).json({ data: group.requests });
  })

  // @desc  accept request to a group.
  // @route PUT /api/v1/groups/:id/requests/:userId
  // @access public
  static acceptRequestGroup = asyncHandler(async(req, res, next) => {
    const { id, userId } = req.params;
    const query = { $pull: { 'requests': userId }, $push: { 'members': { userId } }  };
    const group = await docUtils.updateDoc(Group, id, query, next);
    if (!group) return;
    res.status(201).json({ data: group.members });
  })

  // @desc  refuse request to a group.
  // @route DELETE /api/v1/groups/:id/requests/:userId
  // @access public
  static refuseRequestGroup = asyncHandler(async(req, res, next) => {
    const { id, userId } = req.params;
    const query = { $pull: { 'requests': userId } };
    const group = await docUtils.updateDoc(Group, id, query, next);
    if (!group) return;
    res.status(204).send();
  })
}

module.exports = groupControllers;
