const controller = require('../api.controller');

/**
 * 
 * @param {Express} app 
 */
module.exports = (app) => {
    app.get('/search/:urlId', (req, resp) => {
        controller.getURLById(req, resp);
    });

    app.post('/search', (req, resp) => {
        const {urlId, date, shortUrl} = req.body;

        if(urlId || date || shortUrl) {
            if(urlId){
                controller.getURLById(req, resp);
            } else if(shortUrl){
                controller.getURLByShortUrl(req, resp);
            } else if(date) {
                controller.getURLsByDate(req, resp);
            }
        }
        
        return resp.status(400).json({message: "Informe o id da URL, a URL encurtada ou uma data para busca."});
    });

    app.post('/insert', (req, resp) => {
        controller.insertURL(req, resp);
    });

    app.get('/url-e/:urlId', (req, resp) => {
        controller.redirectURL(req, resp);
    });
};