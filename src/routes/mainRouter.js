import { Router } from "express";
import { MainController } from "../controllers/mainController.js";

export class MainRouter{
    constructor(){
        this.router = Router();
        this.mainController = new MainController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get("/", this.mainController.getIndex.bind(this.mainController));
        this.router.get("/contact", this.mainController.getContact.bind(this.mainController));
        this.router.get("/community", this.mainController.getCommunity.bind(this.mainController));
        this.router.get("/project", this.mainController.getProject.bind(this.mainController));
        this.router.get("/about", this.mainController.getAbout.bind(this.mainController));
    }

    getRouter(){
        return this.router;
    }
}

