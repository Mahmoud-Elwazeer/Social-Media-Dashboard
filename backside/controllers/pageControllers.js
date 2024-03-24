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

  // @desc add admin for page.
  // @route POST /api/v1/pages/:id/admins/:adminId
  // @access public
  static addAdminToPage = asyncHandler(async(req, res, next) => {
    const { id, adminId } = req.params;
    const query = { $push: { 'admins': adminId } };
    const page = await docUtils.updateDoc(Page, id, query, next);
    if (!page) return;
    res.status(201).json({ data: page.admins });
  });

  // @desc delete admin from page.
  // @route DELETE /api/v1/pages/:id/admins/:adminId
  // @access public
  static deleteAdminFromPage = asyncHandler(async(req, res, next) => {
    const { id, adminId } = req.params;
    const query = { $pull: { 'admins': adminId } };
    const page = await docUtils.updateDoc(Page, id, query, next);
    if (!page) return;
    res.status(204).send();
  });

  // @desc get all followers
  // @route GET /api/v1/pages/:id/followers
  // @access public
  static getAllFollowers = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const page = await docUtils.getlDocById(Page, id, next);
    if (!page) return;
    res.status(200).json({ data: page.followers });
  });

  // @desc add follower for page.
  // @route POST /api/v1/pages/:id/followers
  // @access public
  static addFollowerToPage = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const query = { $push: { 'followers': req.user._id } };
    const page = await docUtils.updateDoc(Page, id, query, next);
    if (!page) return;
    res.status(201).json({ data: page.followers });
  });

  // @desc delete admin from page.
  // @route DELETE /api/v1/pages/:id/admins/:followerId
  // @access public
  static deleteFollowerFromPage = asyncHandler(async(req, res, next) => {
    const { id, followerId } = req.params;
    const query = { $pull: { 'followers': followerId } };
    const page = await docUtils.updateDoc(Page, id, query, next);
    if (!page) return;
    res.status(204).send();
  });


  // @desc get all members for specific page
  // @route GET /api/v1/pages/:id/posts
  // @access public
  static getAllPosts = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const page = await docUtils.getlDocById(Page, id, next);
    if (!page) return;
    res.status(200).json({ data: page.posts });
  });

  // @descadd add post in the page
  // @route POST /api/v1/pages/:id/posts
  // @access public
  static addPostToPage = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    req.body.userId = req.user._id;
    const post = await docUtils.createDoc(Post, req.body);
    const query = { $push: { 'posts': post._id } };
    const page = await docUtils.updateDoc(Page, id, query, next);
    if (!page) return;
    res.status(201).json({ data: page.posts });
  });

  // @desc get post for page.
  // @route GET /api/v1/pages/:id/posts/:postId
  // @access public
  static getPostFromPage = asyncHandler(async(req, res, next) => {
    const { id, postId } = req.params;
    let page = await docUtils.getlDocByIdPop(Page, id, 'posts', next);
    if (!page) return;
    const post = page.posts.find(post => post._id.toString() === postId);
    if (!post) {
      next(new ApiError('Not found', 404));
      return;
    }
    res.status(200).json({ data: post});
  });

  // @desc edit a post in page.
  // @route PUT /api/v1/pages/:id/posts/:postId
  // @access public
  static updatePostFromPage = asyncHandler(async(req, res, next) => {
    const { postId } = req.params;
    const post = await docUtils.updateDoc(Post, postId, req.body, next);
    if (!post) return;
    res.status(200).json({ data: post});
  });

  // @desc edit a post in page.
  // @route DELETE /api/v1/pages/:id/posts/:postId
  // @access public
  static deletePostFromPage = asyncHandler(async(req, res, next) => {
    const { id, postId } = req.params;
    const query = { $pull: { 'posts': postId } };
    const page = await docUtils.updateDoc(Page, id, query, next);
    if (!page) return;
    const post = await docUtils.deleteDoc(Post, postId, next);
    if (!post) return;
    res.status(204).send();
  });

}

module.exports = pageControllers;
