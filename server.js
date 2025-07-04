const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const path = require('path');

const app = express();


const liveReloadServer = livereload.createServer({ port: 35729 });
liveReloadServer.watch(path.join(__dirname)); 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());


app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});
