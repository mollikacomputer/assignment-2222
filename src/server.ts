import app from "./app";
import config from "./config";

const main =()=>{
  app.listen( config.port, () => {
  console.log(`DevPlus server  running on the port: ${config.port}`);
});
}

main();