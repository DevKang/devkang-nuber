import { GraphQLServer, PubSub } from 'graphql-yoga';
import { NextFunction, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import decodeJWT from './utils/decodeJTW';

class App {
  public app: GraphQLServer;
  public pubSub: any; // PubSub in yoga is not for production project!!
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema, 
      context: req => {
        console.log(req.connection.context.currentUser);
        
        return {
          req: req.request,
          pubSub: this.pubSub
        }
      }
    })
    this.middlewares();
  }
  private middlewares = () : void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (req , res: Response, next: NextFunction) :Promise<void> => {
    const token = req.get('X-JWT');
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  }
}

export default new App().app;
