import app from "@/app";
import connectDB from "@/configs/database";
import "dotenv/config";

const PORT = process.env.PORT || 5200;
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
