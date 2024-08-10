import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';

const app: Application = express();

// using cors
app.use(cors());

// parse data =================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rendering ejs
app.set('view engine', 'ejs');

// here will be the default routes
app.get('/', (req: Request, res: Response) => {
  res.render('home');
});

// APPLICATION ROUTES
app.use('/api/v1/', router);
//global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessages: [{ path: req.originalUrl, message: 'Api not found' }],
    stack: undefined,
  });
  next();
});

export default app;
