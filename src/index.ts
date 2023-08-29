import app from './server';
import defaultConfig from './config';

const config = defaultConfig;

app.listen(config.port, () => {
    console.log(`hello on http://localhost:${config.port}`);
})