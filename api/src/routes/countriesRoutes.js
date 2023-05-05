const { Router } = require("express")
const { 
    getCountriesHandler,  
    getCountryIdHandler,
} = require("../handlers/countriesHandler");

const countriesRouter = Router();

countriesRouter.get("/", getCountriesHandler)

countriesRouter.get("/:id", getCountryIdHandler)

module.exports = countriesRouter;