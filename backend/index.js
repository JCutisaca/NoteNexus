const { conn } = require('./src/database');
const server = require('./src/server');
const { PORT } = process.env;
const port = PORT || 3001;
const host = "0.0.0.0";

conn.sync({ force: false }).then(() => {
    server.listen(port, host, () => {
        console.log(`Server listening on port ${port}`);
    })
}).catch(error => console.error(error))