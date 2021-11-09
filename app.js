const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

app.use(json());
app.use(bodyParser());

// app.use(async (ctx) => {
//   ctx.body = "Hello World";
//   ctx.body = { msg: "Hello World" };
// });

// DB
let things = ["Music", "Programming", "Games"];

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

// Routes
router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

async function index(ctx) {
  await ctx.render("index", {
    title: "Things I Love:",
    things: things,
  });
}
async function showAdd(ctx) {
  await ctx.render("add");
}

async function add(ctx) {
  things.push(ctx.request.body.thing);
  ctx.redirect("/");
}

router.get("/test", (ctx) => (ctx.body = "Hello Test"));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
