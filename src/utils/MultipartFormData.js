/**
 * Функция преобразования из объекта в multipart/form-data
 * @param {Object} data
 * @return {string}
 */
export default function toFormData(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return formData;
}
