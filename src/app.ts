import express, { Request, Response } from  'express';
import { envs } from './configs';
import { GitHubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';

(()=>{
    main()
})()

function main(){

    const app = express()
    const controller = new GitHubController()

    //Middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(GithubSha256Middleware.veryfySignature)

    app.post('/api/github', controller.webHookHandler) 

    app.listen(envs.PORT, ()=> {
        console.log(`App running on port ${envs.PORT}`);
    })
}