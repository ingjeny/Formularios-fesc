import DocumentController from "../controllers/DocumentController.js"

const routes = (app) => {
    app.use("/document", DocumentController)
}

export {routes}