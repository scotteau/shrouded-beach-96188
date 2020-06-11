const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const oas = require("koa-oas3");


const router = new Router();
const app = new Koa();

router.post("/upload", async (ctx) => {
    ctx.body = {
        message: "it worked!"
    }
})


app.use(koaBody({multipart: true}));

app.listen(3000, () => {
    console.log("server started at 3000");
})