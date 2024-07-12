import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import "dotenv/config";
const port = process.env.EXPRESS_PORT;
const railwayUrl = process.env.RAILWAY_URL || `http://localhost:${port}`;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation of my Express API",
    },
    servers: [
      {
        url: `${railwayUrl}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
  swaggerOptions: {
    tryItOutEnabled: true,
    displayRequestDuration: true,
    filter: true,
  },
};
//
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));
  console.log(`Swagger docs available at /api-docs`);
};
