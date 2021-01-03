exports.errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(error);

  res.statusCode = statusCode;
  if (process.env.NODE_ENV !== "production") {
    return res.json({
      message: error.message,
      error: error.stack,
    });
  }

  return res.json({
    message: "internal server error",
  });
};
