import { generateNanoId } from "../utils/helper.js";

import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL Is Not Generated");
  await saveShortUrl(shortUrl, url);
  return shortUrl;

  //console.log(url);
};
export const createShortUrlWithUser = async (url, userId) => {
  const shortUrl = generateNanoId(7);

  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;

  //console.log(url);
};
