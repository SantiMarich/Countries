const { Router } = require("express")

const {
    getActivitiesHandler,
    postActivitiesHandler
} = require("../handlers/activitiesHandler")

const activiesRouter = Router();

activiesRouter.get("/" , getActivitiesHandler)

activiesRouter.post("/", postActivitiesHandler )

module.exports = activiesRouter;