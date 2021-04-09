export default function showNotification({ message, status }) {
    (async () => {
        try {
            await Notification.requestPermission();
            new Notification(message, {
                body: {
                    success: 'Успешно!',
                    error: 'Ошибка!'
                }[status],
                icon: '/apple-touch-icon.png'
            });
        } catch (error) {}
    })();
}
