import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Manage Employee - Ignite',
      version: '1.0.0',
      description: 'API documentation for manage employee Node app',
    },
  },
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec
