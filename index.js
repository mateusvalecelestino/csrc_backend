import app from "./app"; // importa o app

const port = 3000;
// inicia o server
app.listen(port, () => console.log(`server running on: http://localhost:${port}`));