const ShortURL = require('../models/ShortURL');
const database = require('../services/database');

const queryCallback = function(resp, oneValue, redirect){
       return (error, rows, fields, result) => {
        if (error || rows.length == 0) {
            resp.status(404).json({message: "Nenhuma URL encontrada para os parâmetros especificados!"});
        } else if(!redirect){
            resp.status(200).json(oneValue ? rows[0] : rows);
        } else if (redirect) {
            const {url} = rows[0];
            resp.status(200).redirect(url);
        }
    }
};

/**
 * Função para gerar um id randômico
 * 
 * @param {int} length - Tamanho do id a ser gerado
 * @returns {String} - String aleatória
 */
function makeId(length) {
    var result = '';
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * 
 * @param {Express} app 
 */
module.exports = (app) => {
    app.get('/url/:urlId', (req, resp) => {
        let urlId = req.params.urlId;

        if(urlId && !Number.isNaN(urlId)) {
            database.selectUrlById(Number.parseInt(urlId), queryCallback(resp, true, false));
            return;
        }
        
        return resp.status(400).json({message: "Informe o id numérico da URL para busca."});
    });

    app.post('/url', (req, resp) => {
        const {urlId, date, shortUrl } = req.body;

        if(urlId || date || shortUrl) {
            if(urlId){
                database.selectUrlById(Number.parseInt(urlId), queryCallback(resp, true, false));
                return;
            } else if(shortUrl){
                database.selectUrlsByShortUrl(shortUrl, queryCallback(resp, true, false));
                return;
            } else if(date) {
                var parts = date.split("-");
                if(parts.length == 3){
                    var searchDate = new Date(parseInt(parts[2], 10),
                                    parseInt(parts[1], 10) - 1,
                                    parseInt(parts[0], 10), 0,0,0);
                    database.selectUrlsByDate(searchDate, queryCallback(resp, false, false));
                    return;
                } else {
                    return resp.status(400).json({message: "A data deve estar no formato dd-MM-yyyy"});
                }
            }
        }
        
        return resp.status(400).json({message: "Informe o id da URL ou uma data para busca."});
    });

    app.post('/shorten-url', (req, resp) => {
        const { url } = req.body;
        let randomId = makeId(6);
        let id = 1;
        let shortenUrl = 'http://localhost:3033/url-e/';

        database.selectMaxId(
            (error, rows, fields, result) => {
                if (rows.length == 1) {
                    const {maxId} = rows[0];
                    id = maxId + 1;
                }
                shortenUrl = shortenUrl + id + randomId;
                const shortUrl = new ShortURL(id, url, shortenUrl, null);
                database.insertUrl(shortUrl, (error, result) => {
                    if(!error) {
                        database.selectUrlById(result.insertId, queryCallback(resp, true, false));
                    }
                });
            });
        return;
    });

    app.get('/url-e/:urlId', (req, resp) => {
        let urlId = req.params.urlId;
        var shortUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        if(urlId) {
            database.selectUrlsByShortUrl(shortUrl, queryCallback(resp, true, true));
        }

    });
};