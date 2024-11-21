const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const upload = require("../middleware/upload");
const schoolModel = require('../models/schools');
const axios = require("axios");
const fs = require("fs");
const path = require("path");

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

// Example school list
const schoolList = [
    {"school_id": 487, "schoolname": "anderson-serangoon-junior-college"},
    {"school_id": 488, "schoolname": "anglo-chinese-junior-college"},
    {"school_id": 489, "schoolname": "anglochinese-school-independent-junior-college"},
    {"school_id": 490, "schoolname": "catholic-junior-college"},
    {"school_id": 491, "schoolname": "dunman-high-school-junior-college"},
    {"school_id": 492, "schoolname": "eunoia-junior-college"},
    {"school_id": 493, "schoolname": "hwa-chong-institution-junior-college"},
    {"school_id": 494, "schoolname": "jurong-pioneer-junior-college"},
    {"school_id": 495, "schoolname": "millennia-institute"},
    {"school_id": 496, "schoolname": "nanyang-junior-college"},
    {"school_id": 497, "schoolname": "national-junior-college"},
    {"school_id": 498, "schoolname": "nus-high-school-of-mathematics-and-science-jc"},
    {"school_id": 499, "schoolname": "raffles-institution-junior-college"},
    {"school_id": 500, "schoolname": "river-valley-high-school-junior-college"},
    {"school_id": 501, "schoolname": "school-of-the-arts-singapore-jc"},
    {"school_id": 502, "schoolname": "singapore-sports-school-jc"},
    {"school_id": 503, "schoolname": "st-andrews-junior-college"},
    {"school_id": 504, "schoolname": "st-josephs-institution-junior-college"},
    {"school_id": 505, "schoolname": "tampines-meridian-junior-college"},
    {"school_id": 506, "schoolname": "temasek-junior-college"},
    {"school_id": 507, "schoolname": "victoria-junior-college"},
    {"school_id": 508, "schoolname": "yishun-innova-junior-college"}
]











// Function to download image and upload to DigitalOcean Spaces
const downloadAndUploadImage = async (schoolname, school_id) => {
    const baseUrl = 'https://www.moe.gov.sg/-/media/images/school-logos/post-secondary/';
    const imageUrl = `${baseUrl}${schoolname}`;

    try {
        // Download the image
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });

        // Define S3 upload parameters
        const params = {
            Bucket: process.env.DO_SPACES_BUCKET, // Your Space name
            Key: `school-logo/${Date.now()}_${schoolname}`, // Path in bucket
            Body: response.data,
            ACL: "public-read", // Make uploaded files publicly accessible
            ContentType: response.headers['content-type'],
        };

        // Upload to DigitalOcean Space
        const command = new PutObjectCommand(params);
        await s3.send(command);
        
        const fileUrl = `https://${spacesEndpoint.hostname}/${process.env.DO_SPACES_BUCKET}/${params.Key}`;
        
        // Update the database with the image URL
        const [updateDB] = await schoolModel.updateSchoolLogo({ school_id, img_url: fileUrl });
        return fileUrl; // Return the URL for response
    } catch (error) {
        console.error(`Error downloading or uploading ${schoolname}:`, error);
        throw error; // Rethrow error for handling in the route
    }
};

// Route to handle image upload for all school logos
router.post("/school-logos", async (req, res) => {
    try {
        const promises = schoolList.map(school => downloadAndUploadImage(school.schoolname, school.school_id));
        const results = await Promise.all(promises); // Wait for all uploads to complete

        res.status(200).json({ status: "success", data: results });
    } catch (error) {
        res.status(500).json({ error: "Failed to process school logos." });
    }
});

module.exports = router;
