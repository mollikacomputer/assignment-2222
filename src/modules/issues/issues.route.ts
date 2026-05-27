import { Router } from "express";
import { issuesController } from "./issues.controller";
import issueMiddleware from "../../middleware/issueMiddleware";


const router = Router();

router.post('/', issuesController.createIssue );
router.put('/:id', issuesController.updateIssues);
router.get('/', issuesController.getAllIssues );
router.get('/:id', issuesController.getSingleUserIssue);
router.delete('/:id', issuesController.deleteIssue)
// router.get('/single/:id', issuesController.getSingleIssue)

export const issuesRoute = router;