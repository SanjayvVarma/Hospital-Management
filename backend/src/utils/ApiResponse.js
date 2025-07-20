class ApiResponse {
    constructor(statusCode, data, success, message) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = success < 400
    }
}

export default ApiResponse;