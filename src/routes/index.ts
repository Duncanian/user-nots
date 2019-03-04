import authRouter from './auth';

const apiPrefix = '/api/v1';

const route = (app: any) => {
  app.use(apiPrefix, authRouter);
};

export default route;
