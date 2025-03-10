const HTTP_STATUS_CODES = {
    SUCCESS: {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
    },
    CLIENT_ERROR: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        CONFLICT: 409,
        PAYLOAD_TOO_LARGE: 413,
        UNSUPPORTED_MEDIA_TYPE: 415,
        UNPROCESSABLE_ENTITY: 422,
    },
    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
    }
};

const HTTP_STATUS_MESSAGES = {
    SUCCESS: {
        OK: "OK",
        CREATED: "Resource created successfully",
        ACCEPTED: "Request accepted",
        NO_CONTENT: "No content available",
    },
    CLIENT_ERROR: {
        BAD_REQUEST: "Bad request. Please check your input.",
        UNAUTHORIZED: "Unauthorized access. Please log in.",
        FORBIDDEN: "Forbidden. You don’t have permission.",
        NOT_FOUND: "Resource not found",
        METHOD_NOT_ALLOWED: "Method not allowed",
        CONFLICT: "Conflict. The request could not be processed.",
        PAYLOAD_TOO_LARGE: "Payload size too large",
        UNSUPPORTED_MEDIA_TYPE: "Unsupported media type",
        UNPROCESSABLE_ENTITY: "Unprocessable entity",
    },
    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: "Internal server error",
        NOT_IMPLEMENTED: "Not implemented",
        BAD_GATEWAY: "Bad gateway",
        SERVICE_UNAVAILABLE: "Service unavailable",
        GATEWAY_TIMEOUT: "Gateway timeout",
    }
};

module.exports = { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES };
