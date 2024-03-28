import { envs } from "../../configs";


export class DiscordService{
    constructor(){}

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL

    async notify(message: string){
        const body = {
            content: message,
            embeds: [
                {
                    image: {url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3IxY2tpazF6d3M2c2hsdWI1aWk3NXR3cDBmNTN0dzAwcXoxaTJ0cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif'}
                }
            ]
        }

        const resp = await fetch(this.discordWebhookUrl,{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!resp.ok) {
            console.log("Error sending message to discord");
            return false
            
        }

        return true
    }

}