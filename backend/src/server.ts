import app from "@/app";
import "dotenv/config";

const PORT = process.env.PORT || 5200;
const start = (async () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
