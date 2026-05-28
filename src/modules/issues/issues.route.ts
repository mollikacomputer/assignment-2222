
import { Router } from "express";
import { issuesController } from "./issues.controller";
import role from "../../middleware/role";


const router = Router();



router.post('/', issuesController.createIssue );
router.put('/:id', issuesController.updateIssues);
router.get('/',role(), issuesController.getAllIssues );
router.get('/:id', issuesController.getSingleUserIssue);
router.delete('/:id', issuesController.deleteIssue)


export const issuesRoute = router;