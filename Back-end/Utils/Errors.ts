class customErrors extends Error {
  public status: string;
  public statusCode: number;

  constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode < 500 ? "failed" : "error";
  }
    toJSON() {
      return {
          success: false,
          status: this.status,
          statusCode: this.statusCode,
          message: this.message
      };
  }
  }
  
  export default customErrors;