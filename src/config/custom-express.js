const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    swaggerUi = require('swagger-ui-express'),
    swaggerJsdoc = require('swagger-jsdoc'),
    
    routes = require('../app/routes/routes');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URLShortener API with Swagger",
            version: "0.0.1",
            description: "Nesse projeto prático vamos criar o nosso próprio encurtador de URL. Desta forma devemos ter:\n- um método de encurtar uma URL persistindo-a no banco de dados.\n- um método que retorna uma url encurtada conforme um id.\n- um método que retorna todas as URLs encurtadas em uma data específica.\n- um método que retorna uma url encurtada conforme o encurtamento da URL.",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html"
            },
            contact: {
                name: "Alexandre Silva",
                email: "adiegossilva@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3033/"
            }
        ]
    },
    apis: ["../app/routes/routes.js"]
}

module.exports = (port) => {
    const specs = swaggerJsdoc(options);
    const app = express()
        .use(cors())
        .use(bodyParser.json())
        .use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    routes(app);
    app.listen(port, () => {
        console.log(`URLShortener running on port ${port}`);
    });
};