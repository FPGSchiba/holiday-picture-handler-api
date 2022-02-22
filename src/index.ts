import app from "./app";
import { LOG } from "./utils";

const port = process.env.PORT || 4000;

app.listen(port, () => LOG.info(`HuPiHa API is listening on port: ${port}`));