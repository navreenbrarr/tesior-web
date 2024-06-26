export const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
export const REDIS_PORT = parseInt(process.env.REDIS_PORT ?? "6379");

export const REDIS_CONNECTION_URL ={
  port: 6379, // Redis port
  host: process.env.REDIS_CONNECTION_URL, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD, // Redis password
  db: 0, // Defaults to 0
}
