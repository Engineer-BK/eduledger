import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: {
    name: "prisma-next-demo",
    framework: "nextjs",
    env: ".env",
  },
});
