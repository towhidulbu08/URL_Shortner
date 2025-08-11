import shortUrlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  //console.log("userid", userId);
  try {
    const newUrl = new shortUrlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });
    // console.log(newUrl);
    if (userId) {
      // console.log("user Id", userId);
      //newUrl.user = new mongoose.Types.ObjectId(userId);
      newUrl.user = userId;
      console.log("new Url ", newUrl);
    }
    await newUrl.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError(error);
    }
    throw new Error(error);
  }
};

export const getShortUrl = async (shortUrl) => {
  return await shortUrlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};

export const getCustomUrl = async (slug) => {
  return await shortUrlSchema.findOne({ short_url: slug });
};
