import { useState } from "react";

import { createShortUrl } from "../apis/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    try {
      const URL = await createShortUrl(url);
      setShortUrl(URL);
    } catch (error) {
      // console.error("Error Name", error.name);
      console.error("Error Message:", error.message);
      // console.error("Error Code:", error.code);
      // console.error("Error config", error.config);
      // console.error("Error request:", error.request);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray ">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          onInput={(e) => setUrl(e.target.value)}
          value={url}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md font-bold"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md "
        type="submit"
      >
        Shorten URL
      </button>

      {/* {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-100 rounded-md">
          {error}
        </div>
      )} */}

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your Shortened URL:</h2>
          <div className="flex items-center">
            <input
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-300"
              type="text"
              readOnly
              value={shortUrl}
            />

            <button
              onClick={handleCopy}
              className={` px-4 py-[9px] rounded-r-md "bg-gray-200 ${
                copied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 hover:bg-gray-400"
              }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
