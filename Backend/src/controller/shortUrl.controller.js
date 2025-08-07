import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShorUrl = wrapAsync(async (req, res, next) => {
  const { url } = req.body;
  //console.log(url);
  const shortUrl = await createShortUrlWithoutUser(url);

  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectFromShortUrl = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  const { full_url: url } = await getShortUrl(id);
  if (!url) throw new Error("Short URL Not Found");
  res.redirect(url);
});
