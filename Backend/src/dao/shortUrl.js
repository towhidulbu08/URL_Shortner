import shortUrlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new shortUrlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });
    //console.log(newUrl);
    if (userId) {
      newUrl.user_id = userId;
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
