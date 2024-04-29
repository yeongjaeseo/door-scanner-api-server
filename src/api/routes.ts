import { Express } from 'express';
import users from './user/index';
import user_group from './user_group/index';

const mountRoutes = (app: Express) => {
  app.use('/users', users);
  app.use('/usergroup', user_group);
};

export default mountRoutes;