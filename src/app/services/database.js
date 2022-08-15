/**
 *  @Module Database
 */

const { ShortURL } = require("../models/ShortURL");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'urlshortenerUsr',
    password : '358nCQ5ltZb0%ABwuI2o',
    database : 'urlshortenerdb'
});

connection.connect((err, conn) => {
  if(!err) {
    console.log("Connected to MySql!");
  } else {
    console.log(err);
  }
});

/**
 * Consulta de URL encurtada com base no ID de inserção
 * 
 * @param {int} urlId - ID retornado ao realizar o encurtamento da URL
 * @param {mysql.queryCallback} callback - Callback de finalização da query
 */
function selectUrlById(urlId, callback) {
  connection.query("SELECT * FROM urlshortener WHERE id = ?;", [urlId], callback);
}

/**
 * Consulta de URL encurtada com base na data de inserção, consulta realizada das 00h até às 23h59min da data informada
 * 
 * @param {Date} date - Data em que a URL foi enviada para encurtar
 * @param {mysql.queryCallback} callback - Callback de finalização da query
 */
function selectUrlsByDate(date, callback) {
    let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    connection.query("SELECT * FROM urlshortener WHERE createDate >= ? AND createDate <= ?;", [startDate, endDate], callback); 
}

/**
 * Consulta de URL encurtada com base na própria URL Curta
 * 
 * @param {String} shortUrl - URL Curta criada pela API
 * @param {mysql.queryCallback} callback - Callback de finalização da query
 */
function selectUrlsByShortUrl(shortUrl, callback) {
  connection.query("SELECT * FROM urlshortener WHERE shortUrl = ?;", [shortUrl], callback);
}

function selectMaxId(callback) {
  connection.query("SELECT MAX(id) as maxId FROM urlshortener;", callback);
}

/**
 * Armazena os dados da URL encurtada
 * 
 * @param {ShortURL} shortUrl - Informações a serem armazenadas da URL/URL encurtada      
 * @param {mysql.queryCallback} callback - Callback de finalização da query
 */
function insertUrl(shortUrl, callback) {
    let sql = "INSERT INTO urlshortener(url, shortUrl) VALUES (?, ?);"
    let values = [shortUrl.url, shortUrl.shortUrl];
    connection.query(sql, values, callback);
}

module.exports = {selectMaxId, selectUrlById, selectUrlsByDate, selectUrlsByShortUrl, insertUrl};