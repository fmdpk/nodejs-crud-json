const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo Application",
      version: "1.0.0",
      description:
        "todo crud api with supabase as backend service and user authentication",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change this to your server URL
      },
    ],
    tags: [
      {
        name: "Auth",
        description:
          "Operations related to authentication with help of supabase",
      },
      {
        name: "Todos",
        description: "Operations related to todo crud.Datastore is supabase",
      },
      {
        name: "Items",
        description: "Operations related to item crud.Datastore is a json file",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
