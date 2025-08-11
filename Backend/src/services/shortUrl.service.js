import { generateNanoId } from "../utils/helper.js";

import { getCustomUrl, saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL Is Not Generated");
  await saveShortUrl(shortUrl, url);
  return shortUrl;

  //console.log(url);
};
export const createShortUrlWithUser = async (url, userId, slug = null) => {
  console.log("slug:", slug);
  const shortUrl = slug || generateNanoId(7);
  const exist = await getCustomUrl(slug);
  if (exist) throw new Error("This custom url already exists");
  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;

  //console.log(url);
};
