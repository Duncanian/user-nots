class Responses {
  static handleSuccess(res: any, message: Array<any>, result: object) {
    res.status(message[0]).json({
      success: message[2],
      message: message[1],
      result,
    });
  }

  static handleError(error: any, statusCode: number, response: any) {
    response.status(statusCode).json({
      success: false,
      error,
    });
  }
}

export default Responses;
