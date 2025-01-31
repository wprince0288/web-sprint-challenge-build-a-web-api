const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)
    next();
});

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

server.get('*', (req, res) => {
    res.status(404).json({ message: 'Nothing to see here...' });
});

server.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(error.status || 500).json({ message: error.message });
});

module.exports = server;
