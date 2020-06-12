const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const oas = require("koa-oas3");

const debug = require("debug")("index.js");
const cors = require("@koa/cors");

const uploadFile = require("./services/uploadFile");

const router = new Router();
const app = new Koa();
app.use(cors());
app.use(koaBody({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

router.post("/upload", async (ctx) => {
  const file = ctx.request.files.image;

  const { key, url } = await uploadFile({
    fileName: file.name,
    filePath: file.path,
    fileType: file.type,
  });

  ctx.body = { key, url };
});

router.get("/upload", async (ctx) => {
  ctx.body = {
    message: "Ok",
  };
});

const PORT = 8888;
app.listen(process.env.PORT || PORT, () => {
  console.log("server started at ", PORT);
});
