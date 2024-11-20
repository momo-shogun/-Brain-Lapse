"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var result = dotenv_1.default.config();
if (result.error) {
    console.error("Error loading .env file:", result.error);
}
else {
    console.log("Environment variables loaded:", result.parsed);
}
console.log(process.env);
