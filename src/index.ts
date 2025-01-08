import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { routes } from './routes/routes';
import { connectToDatabase } from './utils/database';

// load environment variables
dotenv.config();

export const app = express();
const PORT = 3000;

// bodyparser setup to handle req and res
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//enable cors globally
app.use(cors());

routes(app);

const startServer = async () => {
  try {
    // connect in non-test environments. NODE_ENV is defined in package.json
    if (process.env.NODE_ENV !== 'test') {
      connectToDatabase(process.env.MONGO_URI!);
    }
    app.listen(PORT, () =>
      console.log(`server running on port ${PORT}...`),
    );
  } catch (err) {
    console.error('Failed to start server: ', err);
  }
};

startServer();
