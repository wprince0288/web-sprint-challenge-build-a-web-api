const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// router.get('/', (req, res) => {
//     res.send('Stuff')
// })

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());

server.use('api/actions', actionsRouter);
server.use('api/projects', projectsRouter);

server.use((req, res) => {
    res.status(404).json({ message: 'Route no here' });
});

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Sever no worky",
    });
});


module.exports = server;
