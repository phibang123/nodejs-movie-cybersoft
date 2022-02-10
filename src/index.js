const express = require("express");
const rootRouter = require("./routes");
const { reponseInterceptor } = require("./middlewares/interceptors");






const app = express(); 
app.use(express.json());
app.use(reponseInterceptor);


app.get("/ping", (req, res) => {
  res.status(204).json(204, "OK");
});


app.use("/api", rootRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
