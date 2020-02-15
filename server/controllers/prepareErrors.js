const prepareErrors = errors => {
    try {
        const preparedErrors = {};

        const appendError = (errors, key, error) => {
            const separatorIndex = key.indexOf('.');

            if (separatorIndex !== -1) {
                const errorKey = key.substring(0, separatorIndex);

                errors[errorKey] = errors[errorKey] || {};
                appendError(errors[errorKey], key.substring(separatorIndex + 1, key.length), error);
            } else {
                errors[key] = error.message;
            }
        };

        Object.keys(errors).forEach(key => {
            appendError(preparedErrors, key, errors[key]);
        });

        return preparedErrors;
    } catch(err) {
        return JSON.stringify(errors);
    }
};

module.exports = prepareErrors;
