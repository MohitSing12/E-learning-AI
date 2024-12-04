import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://AI_Learning_management_owner:zLOjFrd0GZc8@ep-quiet-term-a5lz2ac3.us-east-2.aws.neon.tech/AI_Learning_management?sslmode=require'
  }
});
