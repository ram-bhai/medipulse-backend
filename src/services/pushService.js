// src/services/pushService.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require('../config/firebaseServiceAccount.json')),
    });
}

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
