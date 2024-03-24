const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const docUtils = require('../utils/docUtils');
const postUtils = require('../utils/postUtils');
const Group = require('../models/groupModel');
const Post = require('../models/postModel');
const Page = require('../models/pageModel');

class pageControllers {
  // @desc create page
  // @route POST /api/v1/pages
  // @access public
  static createPage = asyncHandler(async (req, res, next) => {
    req.body.admins = req.user._id
    const page = await docUtils.createDoc(Page, req.body, next);
    if (!page) return;
    res.status(201).json({ data: page });
  });

  // @desc get all pages
  // @route GET /api/v1/pages
  // @access public
  static getAllPages = asyncHandler(async(req, res) => {
    const pages = await docUtils.getDocs(Page, {}, req);
    res.status(200).json({ 
      results: pages.docs.length, page: pages.page, data: pages.docs
    });
  });

  // @desc get list for all pages for user
  // @route GET /api/v1/pages/me
  // @access public
  static getPages = asyncHandler(async(req, res) => {
    const { docs, page } = await docUtils.getDocs(Page, { admins: req.user._id }, req);
    res.status(200).json({ results: docs.length, page, data: docs});
  });

  // @desc get specific page
  // @route GET /api/v1/pages/:id
  // @access public
  static getPageById = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const page = await docUtils.getlDocById(Page, id, next);
    if (!page) return;
    res.status(200).json({ data: page});
  });

  // @desc update specific Page
  // @route PUT /api/v1/pages/:id
  // @access public
  static updatePage = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const page = await docUtils.updateDoc(Page, id, req.body, next);
    if (!page) return;
    res.status(200).json({ data: page});
  });

  // @desc delete specific page
  // @route DELETE /api/v1/pages/:id
  // @access public
  static deletePage = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const page = await docUtils.deleteDoc(Page, id, next);
    if (!page) return;
    res.status(204).send();
  });

  // @desc get all members for specific admins
  // @route GET /api/v1/pages/:id/admins
  // @access public
  static getAllAdmins = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const page = await docUtils.getlDocById(Page, id, next);
    if (!page) return;
    res.status(200).json({ data: page.admins });
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

module.exports = pageControllers;
