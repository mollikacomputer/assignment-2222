import { Router } from "express";
import { issuesController } from "./issues.controller";
import issueMiddleware from "../../middleware/issueMiddleware";


const router = Router();

router.post('/', issuesController.createIssue );
router.put('/:id', issuesController.updateIssues);

export const issuesRoute = router;