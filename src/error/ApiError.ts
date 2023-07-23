module.exports = class ApiError extends Error{
    status: number
    constructor(status: number, message: string) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbiden(message) {
        return new ApiError(403, message)
    }

}