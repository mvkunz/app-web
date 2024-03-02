// swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");

// Adicione ou atualize na sua configuração swaggerJsdoc em swaggerConfig.js ou similar

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação da API do Projeto",
      version: "1.0.0",
      description: "Esta é a documentação da API do projeto utilizando Swagger",
    },
    servers: [
      {
        url: "/api", // Define o prefixo padrão para as rotas
        description: "API prefix",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    // Outras configurações...
  },
  apis: ["./routes/*.js"], // Caminho para os arquivos onde o
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
