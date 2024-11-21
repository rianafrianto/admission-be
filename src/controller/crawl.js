const axios = require('axios');
const cheerio = require('cheerio');

async function crawlSchoolContact(url) {
    const base_url = `https://www.moe.gov.sg/schoolfinder/schooldetail?schoolname=`;
    try {
        const response = await axios.get(base_url+url);
        const $ = cheerio.load(response.data);
    
        // Updated selectors based on the provided HTML structure
        const phoneSelector = 'td:nth-child(2) span:nth-child(3)';
        const emailSelector = 'td:nth-child(2) a';
        const websiteSelector = 'td:nth-child(3) a';
    
        const phone = $(phoneSelector).text().trim();
        const email = $(emailSelector).text().trim();
        const website = $(websiteSelector).attr('href').trim();
    
        console.log('Phone:', phone);
        console.log('Email:', email);
        console.log('Website:', website);
      } catch (error) {
        console.error('Error crawling website:', error);
      }
}

const url = 'https://www.moe.gov.sg/schoolfinder/schooldetail?schoolname=moe-kindergarten-alexandra';


module.exports = {
    crawlSchoolContact
}