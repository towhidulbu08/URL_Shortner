import { getShortUrl } from "../dao/shortUrl.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShorUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  //console.log(url);
  // console.log("req user", req.user);
  console.log(data);
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
    // console.log("req user", req.user);
  } else {
    shortUrl = await createShortUrlWithoutUser(data.url);
  }

  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

// export const createShorUrlAuth = wrapAsync(async (req, res, next) => {
//   const { url } = req.body;
//   //console.log(url);

//   res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
// });

export const redirectFromShortUrl = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  const { full_url: url } = await getShortUrl(id);
  if (!url) throw new Error("Short URL Not Found");
  res.redirect(url);
});

export const createCustomShorUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url, slug._id);
});
