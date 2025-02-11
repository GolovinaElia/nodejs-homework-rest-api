const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const { HttpCode } = require("./src/helpers/constants")
const { ErrorHandler } = require("./src/helpers/ErrorHandler")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const { apilimit, jsonlimit } = require("./src/config/rate-limit.json")
const path = require("path")

const usersRouter = require("./routes/api/users")
const contactsRouter = require("./routes/api/contacts")

const app = express()
app.use(express.static(path.join(__dirname, "public")))
const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: jsonlimit }))
app.use(
  "/api/",
  rateLimit({
    windowMs: apilimit.windowMs,
    max: apilimit.max,
    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          "You have reached the number of requests"
        )
      )
    },
  })
)
app.use("/api/users", usersRouter)
app.use("/api/contacts", contactsRouter)

app.use((_, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  })
})
app.use((error, req, res, next) => {
  error.status = error.status ? error.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(error.status).json({
    status: error.status === 500 ? "fail" : "error",
    code: error.status,
    message: error.message,
    data: error.status === 500 ? "Internal server error" : error.data,
  })
})

module.exports = app
