import 'reflect-metadata';
import 'dotenv/config';
import App from '@/app';
import { Authorize } from '@/middlewares/Authorize';
import { ErrorHandler } from '@/middlewares/ErrorHandler';
import { Application } from 'express';
import {
  useContainer as useRoutingControllerContainer,
  useExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as useTypeORMContainer } from 'typeorm';

/**
 * Port number
 *
 * @type {string | number}
 */
const port: string | number = process.env.NODE_PORT || 3000;

/**
 * Use routing controller ioc container to resolve dependency injection
 *
 * @returns {void}
 */
useRoutingControllerContainer(Container);

/**
 * Use typeorm ioc container to resolve dependency injection
 *
 * @returns {void}
 */
useTypeORMContainer(Container);

/**
 * Register application into routing controllers
 *
 * @returns {Application}
 */
useExpressServer<Application>(App, {
  cors: true,
  controllers: [__dirname + '/modules/**/controllers/*.ts'],
  middlewares: [ErrorHandler],
  authorizationChecker: Authorize.handle,
  defaultErrorHandler: false,
});

/**
 * Serve the app
 *
 * @returns {void}
 */
App.listen(port, (): void =>
  console.log(`Server is running for ${process.env.NODE_ENV} at port ${port}`),
);
