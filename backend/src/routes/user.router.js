import { Router } from "express";
import { getUser, postUser, updateUser, deleteUser } from "../controller/user.controller.js";

const router = Router()

router.route("/").get(getUser)
router.route("/").post(postUser)
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser)

export default router