import { Router } from 'express';
import example from './example.routes';
import filter from './filter.routes';
import auth from './auth.routes';
import issueType from './issueType.routes';
import priority from './priority.routes';
import issue from './issue.routes';

const routes = Router();

routes
    .use('/example', example)
    .use('/filter', filter)
    .use('/auth', auth)
    .use('/issueType', issueType)
    .use('/priority', priority)
    .use('/issue', issue);

export default routes;
