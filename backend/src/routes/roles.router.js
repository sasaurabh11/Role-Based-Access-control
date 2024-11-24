import { Router } from "express";
import { createRole, deleteRole, getRoles, updateRole, addPermission, updatePermission, removePermission  } from "../controller/role.controller.js";

const router = Router()

router.route("/").get(getRoles)
router.route("/").post(createRole)
router.route("/:id").put(updateRole)
router.route("/:id").delete(deleteRole)
router.post('/:roleId/permissions', addPermission);
router.put('/:roleId/permissions/:permissionId', updatePermission);
router.delete('/:roleId/permissions/:permissionId', removePermission);

export default router