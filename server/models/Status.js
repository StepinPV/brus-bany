class Status {
    static success(data) {
        return { status: 'success', data };
    };
    static error(message) {
        return { status: 'error', message };
    };
}

module.exports = Status;
