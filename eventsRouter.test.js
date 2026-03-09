const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");

// it("GET /events/categories sans token", async () => {
//   const res = await request(app).get("/events/categories");

//   expect(res.statusCode).toBe(401);
//   expect(res.body.message).toBe("Token manquant");
// });

it("GET /events/categories avec token", async () => {
  const res = await request(app).get("/events/categories");
  // .set(
  //   "authorization",
  //   `Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18zQU84MlYxV2ZpODg4YWtQaU9sZDNoSlhOTGwiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NzI4MTQwMjksImZ2YSI6Wzk5OTk5LC0xXSwiaWF0IjoxNzcyODEzOTY5LCJpc3MiOiJodHRwczovL3Vwd2FyZC10b3J0b2lzZS05NC5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE3NzI4MTM5NTksInNpZCI6InNlc3NfM0FSQkp0TTFYd3FaYTFEY3JaU09CTEZrZmJjIiwic3RzIjoiYWN0aXZlIiwic3ViIjoidXNlcl8zQVJCSnJDSTJCS015RFdEZ3l3aDJaYkJWRWEiLCJ2IjoyfQ.raDpFD8nbj43oKMhyzW1djVYqgiQrFLlzoibLVqFbA4017bSFdPeBP7JBMoWw3zrY7MZE2DCZwb_GjLntj2gh6fGupGhwgub7Zei5D7iAZLSYsif-nvrKKlXO50wvNzYLhddaEA42-2w-0pUekAkMYWq21KkK57LfuzuCg4cHqSRpD0zyGY7qofgET35BlDF53EZVaEByShBUs-K7nBI4leGLd-fnKU9PpVGien8xFNmmGTVGqYDdSNojfdNLuT6ZZRi5w7_31VRjPkCVxETEQukzjDMRXjuT-xBRhO5QeIzaqhBezjZEce6xmUspgXnl_r52OpiwSXKsvVX8iAAAg`,
  // );

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([
    "manger",
    "santé",
    "culture",
    "nature",
    "services",
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});
