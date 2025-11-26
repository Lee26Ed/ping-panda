export class AppError extends Error {
    constructor(
        public message: string,
        public status = 400 // HTTP-ish metadata (optional)
    ) {
        super(message)
        this.name = new.target.name // keeps the derived class name
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Not found") {
        super(message, 404)
    }
}

export class DbError extends AppError {
    constructor(message = "Database error") {
        super(message, 500)
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(message, 400)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401)
    }
}
