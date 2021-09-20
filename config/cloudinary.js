require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "onfire",
    api_key: "619845173278836",
    api_secret: "7vUHW5ZDCCeif6s2RQQDxT2Xf_s",
    secure: true,
});

module.exports = { cloudinary };
