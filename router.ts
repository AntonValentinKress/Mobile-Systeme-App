import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();
const router = new Router();
//IP und Port
//const routerIp = '192.168.1.170';
//const routerIp = '192.168.0.178';
//const routerIp = '192.168.178.77'; 
const routerIp = '192.168.0.178'; 
const routerPort = 8088;

router.get('/', async (ctx) => {
    ctx.response.redirect('/index');
});

router.get('/index', async (ctx) => {

    const bytes = await Deno.readFile('index.html');

    ctx.response.body = bytes;
});

router.get('/assets/:filename', async (ctx) => {
    const filename = ctx.params.filename;
    try {
        await send(ctx, filename, {
            root: './assets',
        });
    } catch (err) {
        console.error("Fehler:", err);
        ctx.response.status = 404;
        ctx.response.body = "Assets bereitgestellt.";
    }
});

//Deno Command Doku: https://docs.deno.com/api/deno/~/Deno.Command
router.get('/maschinendaten', async (ctx) => {
    const command = new Deno.Command('python3', {
        args: ['assets/sensehat.py'],
    });
    const { code, stdout, stderr } = await command.output();

    if (code === 0) {
        const output = new TextDecoder().decode(stdout);
        ctx.response.body = output;
        ctx.response.type = 'application/json';
    } else {
        const errorOutput = new TextDecoder().decode(stderr);
        console.error("Fehler: Python Skript konnte nicht ausgeführt werden.", errorOutput);
        ctx.response.status = 500;
        ctx.response.body = "Fehler: Python Skript konnte nicht ausgeführt werden.";
    }   
});

router.get('/support', async (ctx) => {
    const command = new Deno.Command('python3', {
        args: ['assets/supportMessage.py'],
    });
    const { code, stdout, stderr } = await command.output();

    if (code === 0) {
        const output = new TextDecoder().decode(stdout);
        ctx.response.body = output;
        ctx.response.type = 'application/json';
    } else {
        const errorOutput = new TextDecoder().decode(stderr);
        console.error("Fehler: Python Skript konnte nicht ausgeführt werden.", errorOutput);
        ctx.response.status = 500;
        ctx.response.body = "Fehler: Python Skript konnte nicht ausgeführt werden.";
    }   
});


app.use(router.routes());

console.log(`Now listening on ${routerIp}:${routerPort}/index.`);
await app.listen(`${routerIp}:${routerPort}`);