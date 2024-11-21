const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const upload = require("../middleware/upload");
const schoolModel = require('../models/schools')

const router = express.Router();

// Configure S3 Client with DigitalOcean Spaces credentials
const spacesEndpoint = { hostname: "sgp1.digitaloceanspaces.com" }; // Replace with your space region
const s3 = new S3Client({
  endpoint: `https://${spacesEndpoint.hostname}`, // DO Spaces endpoint
  region: "sgp1", // Adjust to your region
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

// Route to handle image upload
router.post("/school-logo", upload.single("image"), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  const { item, school_id } = req.body; // Access item and school_id
    console.log(school_id);
  // Define S3 upload parameters
  const params = {
    Bucket: process.env.DO_SPACES_BUCKET, // Your Space name
    Key: `school-logo/${Date.now()}_${originalname}`, // Path in bucket
    Body: buffer,
    ACL: "public-read", // Make uploaded files publicly accessible
    ContentType: mimetype,
  };

  // Upload to DigitalOcean Space
  try {
    const command = new PutObjectCommand(params);
    await s3.send(command); // No `Location` in v3, use constructed URL instead
    const fileUrl = `https://${spacesEndpoint.hostname}/${process.env.DO_SPACES_BUCKET}/${params.Key}`;
    try{
        const [updateDB] = await schoolModel.updateSchoolLogo({school_id,img_url:fileUrl})
        res.status(200).json({status:"success",data: {url: fileUrl} });
    }catch(error){
        console.error("Error uploading to Space:", error);
        res.status(500).json({ error: "Upload failed" });
    }
   
  } catch (error) {
    console.error("Error uploading to Space:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
