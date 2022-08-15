
/**
 * 
 * @param {number} id - ID da url persistida no banco
 * @param {string} url - URL original
 * @param {string} shortUrl - URL encurtada
 * @param {Date} createDate - Data de criação da URL encurtada
 */
module.exports = function ShortURL(id, url, shortUrl, createDate) {
    this.id = id;
    this.url = url;
    this.shortUrl = shortUrl;
    this.createDate = createDate;
}