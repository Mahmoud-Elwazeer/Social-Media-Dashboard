const asyncHandler = require('express-async-handler');
const ApiError = require('./apiError');

class docUtils {
  // @desc create document depend on model and query
  static createDoc = async (model, query) => {
    const doc = await model.create(query);
    return doc;
  };

  // @desc get all documents depend on model and query
  static getDocs = async (model, query, req) => {
    // pagination for page
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;  // when got to page 2 => skip (2 - 1) * limit
    const docs = await model.find(query).skip(skip).limit(limit);

    const obj = {
      docs,
      page,
      limit
    }
    return (obj);
  };

  // @desc get document depend on model and query
  static getDoc = async (model, query, next) => {
    const doc = await model.findOne(query);
    if (!doc) {
      next(new ApiError('Not found', 404));
    }

    return (doc);
  };

  // @desc get document depend on model and ID
  static getlDocById = async (model, id, next) => {
    const doc = await model.findById(id);
    if (!doc) {
      next(new ApiError('Not found', 404));
    }

    return (doc);
  };

  // @desc get document depend on model and ID and populate field
  static getlDocByIdPop = async (model, id, field,  next) => {
    const doc = await model.findById(id).populate(field);
    if (!doc) {
      next(new ApiError('Not found', 404));
    }

    return (doc);
  };

  // @desc update document depend on model and ID
  static updateDoc = async (model, id, query, next) => {
    const doc = await model.findByIdAndUpdate(
      { _id: id},
      query,
      { new: true}, // to return value after update
    )
    if (!doc) {
      next(new ApiError('Not found', 404));
    }
    return (doc);
  };

  // @desc filter document depend on model and ID
  static filterDoc = async (model, query, next) => {
    const doc = await model.aggregate(query).exec();
    if (!doc) {
      next(new ApiError('Not found', 404));
    }
    return (doc);
  };

  // @desc delete document depend on model and ID
  static deleteDoc = async (model, id, next) => {
    const doc = await model.findByIdAndDelete(id);
    if (!doc) {
      next(new ApiError('Not found', 404));
    }
    return true;
  };
}

module.exports = docUtils;
