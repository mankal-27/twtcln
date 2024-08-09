import { Router, Request, Response } from 'express';

const router = Router();

//Tweet Crud EndPoint

//Create Tweet
router.post('/', (req: Request, res: Response) => {
    res.status(501).json({error: 'Not Implemeneted'})
})

//Get List of  Tweet
router.get('/', (req: Request, res: Response) => {
    res.status(501).json({error: 'Not Implemeneted'})
})

//Get One Tweet
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemeneted : ${id}`})
})

//Update Tweet
router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemeneted : ${id}`})
})

//Delete Tweet
router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemeneted : ${id}`})
})

export default router;