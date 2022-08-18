require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

module.exports = {
    PORT: process.env.PORT || 8080,
    DB_HOST: process.env.DB_HOST || 'awseb-e-hhw2spudmm-stack-awsebrdsdatabase-qgkdhqtld9d4.cdueplnz1rp4.us-east-1.rds.amazonaws.com',
    DB_USER: process.env.DB_USER || 'urlshortenerUsr',
    DB_PASS: process.env.DB_PASS || '358nCQ5ltZb0%ABwuI2o',
    DB_NAME: process.env.DB_NAME || 'urlshortenerdb',
}