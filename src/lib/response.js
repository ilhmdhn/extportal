module.exports = {
  success(res, message = "Success", data = null) {
    return res.status(200).json({
      state: true,
      message,
      data,
    });
  },

  error(res, message = "Error", code = 500, data = null) {
    return res.status(code).json({
      state: false,
      message,
      data,
    });
  },

  badRequest(res, message = "Bad Request", data = null) {
    return this.error(res, message, 400, data);
  },

  notFound(res, message = "Not Found") {
    return this.error(res, message, 404);
  },
  
  unauthorized(res, message = "Unauthorized") {
    return this.error(res, message, 401);
  }
};