import { Router, Request, Response } from 'express';

const router = Router();

//User Crud EndPoint

//Create User
router.post('/', (req: Request, res: Response) => {
    res.status(501).json({error: 'Not Implemeneted'})
})

//Get List of  User
router.get('/', (req: Request, res: Response) => {
    res.status(501).json({error: 'Not Implemeneted'})
})

//Get One User
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemeneted : ${id}`})
})

//Update User
router.put('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemeneted : ${id}`})
})

//Delete User
router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemeneted : ${id}`})
})

export default router;