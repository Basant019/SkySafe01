const nodemailer = require("nodemailer");
const { pool } = require("../config/db");

// Configure the nodemailer transporter
// For a beginner-friendly setup, we use Gmail or a mock ethereal email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'test@gmail.com',
        pass: process.env.EMAIL_PASS || 'password'
    }
});

/**
 * Creates a notification in the database and optionally sends an email
 */
async function createAndSendNotification(userId, type, title, message, sendEmail = false, userEmail = null) {
    try {
        // 1. Store notification in database
        const [result] = await pool.query(
            `INSERT INTO notifications (user_id, type, title, message, sent_email) VALUES (?, ?, ?, ?, ?)`,
            [userId, type, title, message, sendEmail]
        );

        // 2. Send email if requested and email is provided
        if (sendEmail && userEmail) {
            const mailOptions = {
                from: process.env.EMAIL_USER || 'SkySafe <alerts@skysafe.com>',
                to: userEmail,
                subject: `[SkySafe Alert] ${title}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #2563eb;">SkySafe ${type.charAt(0).toUpperCase() + type.slice(1)} Alert</h2>
                        <p style="font-size: 16px; color: #333;">Hello,</p>
                        <p style="font-size: 16px; color: #333;"><strong>${title}</strong></p>
                        <p style="font-size: 14px; color: #555; background: #f9f9f9; padding: 15px; border-left: 4px solid #f59e0b;">
                            ${message}
                        </p>
                        <p style="font-size: 12px; color: #999; margin-top: 20px;">
                            Stay safe,<br/>The SkySafe Team
                        </p>
                    </div>
                `
            };
            
            // In a real environment, you'd wait for this to send or handle it asynchronously.
            // For now, we will just try to send it (it will fail gracefully if credentials aren't set).
            transporter.sendMail(mailOptions).catch(err => {
                console.warn("Could not send email (ensure EMAIL_USER/EMAIL_PASS are set in .env):", err.message);
            });
        }

        return result.insertId;
    } catch (error) {
        console.error("Error creating notification:", error.message);
        throw error;
    }
}

/**
 * Smart Condition Checker
 * Automatically determines if a notification should be sent based on conditions
 */
async function triggerConditionBasedAlerts(userId, userEmail, condition, location) {
    let type = 'general';
    let title = '';
    let message = '';
    let sendEmail = false;

    // Smart logic based on conditions
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm')) {
        type = 'weather';
        title = `Bad Weather Expected in ${location}`;
        message = `Heavy ${condition} is expected in your location. Please carry an umbrella and drive safely.`;
        sendEmail = true; // High priority, send email
    } 
    else if (condition.toLowerCase().includes('disaster')) {
        type = 'disaster';
        title = `EMERGENCY ALERT: ${location}`;
        message = `A major disaster has been reported in ${location}. Follow local authorities and stay safe.`;
        sendEmail = true;
    }
    else if (condition.toLowerCase().includes('trip')) {
        type = 'trip';
        title = `Upcoming Trip Reminder`;
        message = `Your trip to ${location} is coming up soon! Make sure to review your packing list and safety tips.`;
        sendEmail = false; // Just an in-app notification
    } else {
        // No trigger match
        return null;
    }

    return await createAndSendNotification(userId, type, title, message, sendEmail, userEmail);
}

module.exports = {
    createAndSendNotification,
    triggerConditionBasedAlerts
};
