const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadFileToImageKit = async (file) => {
  const result = await imagekit.files.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname
  });

  return result;
};

module.exports = uploadFileToImageKit;
