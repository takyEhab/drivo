// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
}
