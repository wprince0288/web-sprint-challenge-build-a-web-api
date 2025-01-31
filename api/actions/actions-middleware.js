// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

module.exports = {
    checkId_actions,
    checkPost_actions,
    checkPut_actions
};

function checkId_actions(req, res, next) {
    const id = req.params.id;
    Actions.get(id)
        .then(action => {
            if (!action) {
                return res.status(404).json({ message: `No actions found with id ${id}` })
            }
            req.action = action;
            next();
        })
        .catch(next);
}
async function checkPost_actions(req, res, next) {
    try {
        const { project_id, description, notes } = req.body;
        if (!project_id || !description || !notes) {
            res.status(400).json({
                message: 'project_id, description, and notes are required'
            });
        }
        const project = await Projects.get(project_id);
        if (!project) {
            res.status(404).json({
                message: `Project with id ${project_id} not found`
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}

async function checkPut_actions(req, res, next) {
    try {
        const { project_id, description, notes } = req.body;
        if (
            project_id === undefined ||
            description === undefined ||
            notes === undefined ||
            req.body.completed === undefined
        ) {
            res.status(400).json({
                message: 'project_id, description, notes, and completed are required'
            })
        }
        const project = await Projects.get(project_id);
        if (!project) {
            return res.status(400).json({
                message: `Project with id ${project_id} not found`
            })
        }
        next();
    } catch (error) {
        next(error);
    }
}