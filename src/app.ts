import express, { Request, Response } from  'express';
import { envs } from './configs';

(()=>{
    main()
})()

function main(){

    const app = express()

    app.post('/api/github', (req:Request, res: Response)=>{
        res.json('GitHub Endpoint')
    })

    app.listen(envs.PORT, ()=> {
        console.log(`App running on port ${envs.PORT}`);
        
    })
}