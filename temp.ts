import dotenv from "dotenv";
const result = dotenv.config();

if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Environment variables loaded:", result.parsed);
}
console.log(process.env);
