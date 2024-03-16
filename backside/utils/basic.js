// check valid ID or Not
import { ObjectId } from 'mongodb';

const basicUtils = {
  isValidId(id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }
    return true;
  },
};

module.exports = basicUtils;