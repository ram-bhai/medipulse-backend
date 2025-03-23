const admin = require('../config/firebaseConfig');

exports.sendNotification = async (userId, title, body) => {
    const payload = {
        notification: {
            title,
            body,
        },
    };
    // Assuming userId maps to a device token stored in DB (this part can be modified)
    const userDeviceToken = await getUserDeviceToken(userId);
    if (userDeviceToken) {
        await admin.messaging().sendToDevice(userDeviceToken, payload);
    }
};

async function getUserDeviceToken(userId) {
    return 'user-device-token';
}
