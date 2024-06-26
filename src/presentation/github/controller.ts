import { Request, Response } from  'express';
import { GitHubService } from '../service/github.service';
import { DiscordService } from '../service/discord.service';


export class GitHubController{
    
    constructor(
        private readonly githubService= new GitHubService(),
        private readonly discordService = new  DiscordService()
        ){}

    webHookHandler =(req:Request, res: Response)=>{
        
        const gitHubEvent = req.header('x-github-event')?? 'unknown'// Con este header podemos ver que tipo de evento es el que esta haciendo la peticion a nuestro backend
        //const signature = req.header('x-hub-signature-256')?? 'unknown' este es un codigo que proporciona el evento de github para la seguridad del webhook
        const payload = req.body;// aqui viene toda la informacion del payload dependiendo de donde estemos haciendo un webhook puede vennir como obtejo o puede venir la informacion como string entonces tendriamos que hacerle un JSON.parse para convertirla en un objeto literal

        let message: string

        switch (gitHubEvent) {
            case 'star':
               message = this.githubService.onStar(payload)
                break;
            case 'issues':
               message = this.githubService.onIssue(payload)
                break;
        
            default:
                message =`Unknown event ${gitHubEvent}`
                
        }
        
        this.discordService.notify(message)
        .then(()=> res.status(202).send('Accepted'))
        .catch(()=> res.status(500).json({error:'Internal server Error'}))
        
    }
}