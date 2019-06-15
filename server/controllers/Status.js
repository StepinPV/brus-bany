class Status {
    static success(data) {
        return { status: 'success', data };
    };
    static error(message, data) {
        return { status: 'error', message, data };
    };
}

module.exports = Status;
