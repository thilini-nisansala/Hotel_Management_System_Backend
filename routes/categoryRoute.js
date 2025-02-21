import express from "express";
import {createCategory, deleteCategory, getCategory, getCategoryByName, updateCategory} from "../controllers/categoryController.js";
const categoryRouter = express. Router();

categoryRouter.post("/", createCategory)

categoryRouter.delete("/:name",deleteCategory)// as a ID can post,delete,get value

categoryRouter.get("/:name",getCategoryByName)

categoryRouter.get("/",getCategory);

categoryRouter.put("/:name",updateCategory);

export default categoryRouter;
