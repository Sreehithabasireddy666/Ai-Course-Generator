/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_ev4aPwqKY5EI@ep-twilight-bush-adwgkvxq-pooler.c-2.us-east-1.aws.neon.tech/Aicoursegenerator?sslmode=require&channel_binding=require",
  },
};