import express from "express";
import * as process from "node:process";
import consolidate from "consolidate";
import __dirname from "path";
import {authorize, configuration, home, jwks, token, userinfo} from '@/routes/index.ts'

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}

const app = express();

app.engine('twig', consolidate.twig);
app.set('views', __dirname + '/../views/');
app.set('trust proxy', true);

app.get('/', home)
app.get('/.well-known/openid-configuration', configuration)
app.get('/authorize', authorize)
app.post('/authorize', express.urlencoded({extended: false}), authorize)
app.post('/token', express.urlencoded({extended: false}), token)
app.get('/jwks', jwks)
app.get('/userinfo', userinfo)

const PORT = parseInt(process.env.PORT, 10) || 9998
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
