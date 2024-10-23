class IntegrityException extends Error {
    constructor(field, reason) {
        super(`IntegrityException: Field '${field}' failed due to '${reason}'.`);
        this.field = field;
        this.reason = reason;
        this.name = 'IntegrityException';
    }
}

class UniqueFieldViolationException extends IntegrityException {
    constructor(field) {
        super(field, 'unique constraint violation');
        this.name = 'UniqueFieldException';
    }
}

class ModelNotFoundException extends Error {
    constructor(model, id) {
        super(`ModelNotFoundException: ${model} with id ${id} not found.`);
        this.model = model;
        this.id = id;
        this.name = 'ModelNotFoundException';
    }
}

module.exports = {UniqueFieldViolationException}