export function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

export function addRequestTime(req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}

export function requireAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = { id: 1, role: "user" };
  next();
}
