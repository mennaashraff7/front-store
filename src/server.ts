import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import db from './database'
import routes from './routes'


const app: express.Application = express()
const address: string = "0.0.0.0:3030"

app.use(bodyParser.json());

app.use('/api',routes);
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3030, function () {
    console.log(`starting app on: ${address}`)
})
export default app;