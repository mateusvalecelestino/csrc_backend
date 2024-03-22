import app from './app'; // importa o app
import 'dotenv/config';

const port = process.env.PORT;
// inicia o server
app.listen(port, () =>
    console.log(`server running on: http://localhost:${port}`)
);
