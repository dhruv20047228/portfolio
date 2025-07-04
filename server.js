const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const path = require('path');

const app = express();

// 🔁 Live reload setup
const liveReloadServer = livereload.createServer({ port: 35729 });
liveReloadServer.watch(path.join(__dirname, 'src'));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());

// 📂 Serve static files
app.use(express.static(path.join(__dirname, 'src')));

// ✅ Optional: default fallback (if needed)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});
