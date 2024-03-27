import express, { Request, Response } from  'express';
import { envs } from './configs';
import { GitHubController } from './presentation/github/controller';

(()=>{
    main()
})()

function main(){

    const app = express()
    const controller = new GitHubController()

    //Middleware
    app.use(express.json())

    app.post('/api/github', controller.webHookHandler) 

    app.listen(envs.PORT, ()=> {
        console.log(`App running on port ${envs.PORT}`);
        
    })
}