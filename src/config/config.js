require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

module.exports = {
    PORT: process.env.PORT || 8080,
    DB_HOST: process.env.DB_HOST || localhost,
    DB_USER: process.env.DB_USER || user,
    DB_PASS: process.env.DB_PASS || pass,
    DB_NAME: process.env.DB_NAME || dbname,
}