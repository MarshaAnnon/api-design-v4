import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import router from './router';
import { protect } from './modules/auth';
import { createUser, signIn } from './handlers/user';

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handlers ONLY use next() to pass errors to the error handler thus telling express "hey, I have an error" and now the ability to handle asynchronous errors and if you pass anything to next, it's going to be treated like an error
app.get('/', (req, res, next) => { 
  setTimeout(() => { 
    next(new Error('oops!'))
  }, 1000)
  res.json({ message: 'Uh-oh, something has gone awry!!' });
});

app.use('/api', protect, router);

app.post('/user', createUser) 
app.post('/signin', signIn)

// error handlers always go at the bottom of the file after all your routes because your routes need to run before errors happen
app.use((err, req, res, next) => { // this kind of error handling only works for synchronous errors. Express cannot handle async errors because of how it works.
  if(err.type === 'auth') {
    console.error(err)
    return res.status(401).json({ 'message':  'Unauthorized' })
  } else if (err.type === 'input') {
    console.error(err)
    return res.status(400).json({ 'message': 'Invalid input' })
  } else {
    console.error(err)
    return res.status(500).json({ 'message': 'Internal Server Error' })
  }

})

export default app;
