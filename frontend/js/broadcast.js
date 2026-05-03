(function initGlobalBroadcast() {
    if (window.SkySafeBroadcastInitialized) return;
    window.SkySafeBroadcastInitialized = true;

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.');
    const SKYSAFE_API = isLocal ? `http://${window.location.hostname}:5000` : `https://${window.location.hostname}`;
    // --- Inject socket.io script dynamically if not already loaded ---
    function loadSocketAndConnect() {
        if (typeof io !== 'undefined') {
            connectSocket();
            return;
        }
        const script = document.createElement('script');
        script.src = `${SKYSAFE_API}/socket.io/socket.io.js`;
        script.onload = connectSocket;
        script.onerror = () => console.warn('⚠️ SkySafe: Could not load Socket.io — real-time alerts disabled.');
        document.head.appendChild(script);
    }

    // --- Connect & Listen ---
    function connectSocket() {
        try {
            const socket = io(SKYSAFE_API, { reconnectionAttempts: 5 });

            socket.on('connect', () => {
                console.log('📡 SkySafe: Real-time emergency broadcast channel ACTIVE');
            });

            // 🚨 THE KEY EVENT — fired when admin hits "Broadcast Global Alert"
            socket.on('broadcast_alert', (alert) => {
                showBroadcastBanner(alert);
                triggerNativePush(alert);
            });

        } catch (e) {
            console.warn('SkySafe broadcast init failed:', e.message);
        }
    }

    // --- Big Red Emergency Banner (visible on any page, no refresh needed) ---
    function showBroadcastBanner(alert) {
        // Remove any existing banner first
        const existing = document.getElementById('skysafe-broadcast-banner');
        if (existing) existing.remove();

        const banner = document.createElement('div');
        banner.id = 'skysafe-broadcast-banner';
        banner.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; z-index: 999999;
            background: linear-gradient(90deg, #7f1d1d, #991b1b, #7f1d1d);
            border-bottom: 3px solid #ef4444;
            padding: 14px 20px;
            display: flex; align-items: center; gap: 14px;
            font-family: Inter, sans-serif;
            animation: skysafeBannerSlide 0.4s ease;
            box-shadow: 0 4px 30px rgba(239, 68, 68, 0.5);
        `;

        banner.innerHTML = `
            <style>
                @keyframes skysafeBannerSlide {
                    from { transform: translateY(-100%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
                @keyframes skysafePulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.4; }
                }
            </style>
            <span style="font-size:26px; animation: skysafePulse 1s infinite;">🚨</span>
            <div style="flex:1">
                <div style="color:#fca5a5; font-size:10px; font-weight:800; letter-spacing:2px; text-transform:uppercase;">
                    ⚡ OFFICIAL EMERGENCY BROADCAST — SKYSAFE COMMAND
                </div>
                <div style="color:#fff; font-size:14px; font-weight:700; margin-top:3px;">
                    ${alert.title || '🚨 EMERGENCY ALERT'}
                </div>
                <div style="color:#fecaca; font-size:12px; margin-top:2px; opacity:0.9;">
                    ${alert.description || 'A critical alert has been issued for your area.'} 
                    <span style="color:#fca5a5; margin-left:8px;">📍 ${alert.location || 'All Areas'}</span>
                </div>
            </div>
            <a href="dashboard.html" style="background:#ef4444; color:#fff; padding:8px 16px; border-radius:8px; font-size:12px; font-weight:700; text-decoration:none; white-space:nowrap; box-shadow:0 2px 10px rgba(239,68,68,0.5);">
                View Dashboard
            </a>
            <button onclick="document.getElementById('skysafe-broadcast-banner').remove()" 
                style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; width:28px; height:28px; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                ×
            </button>
        `;

        document.body.insertBefore(banner, document.body.firstChild);
        
        // Auto-dismiss after 30 seconds
        setTimeout(() => {
            if (document.getElementById('skysafe-broadcast-banner')) {
                banner.style.transition = 'opacity 0.5s';
                banner.style.opacity = '0';
                setTimeout(() => banner.remove(), 500);
            }
        }, 30000);
    }

    // --- Native OS Push Notification ---
    function triggerNativePush(alert) {
        if (!('Notification' in window)) return;

        if (Notification.permission === 'granted') {
            sendPush(alert);
        } else if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') sendPush(alert);
            });
        }
    }

    function sendPush(alert) {
        try {
            const n = new Notification(alert.title || '🚨 EMERGENCY BROADCAST', {
                body: `${alert.description || 'Critical alert issued.'}\n📍 ${alert.location || 'All Areas'}`,
                icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
                requireInteraction: true,  // stays until user dismisses
                vibrate: [300, 100, 300, 100, 300],
                tag: 'skysafe-emergency',  // prevents duplicate stacking
            });
            // Click on notification → open dashboard
            n.onclick = () => {
                window.focus();
                window.location.href = 'dashboard.html';
            };
        } catch (e) {
            console.warn('Push notification failed:', e.message);
        }
    }

    // --- Request permission (must be user-triggered) ---
    function askForNotificationPermission() {
        if (!('Notification' in window)) return;
        
        if (Notification.permission === 'default') {
            // Show a custom toast/banner to get a user click
            const prompt = document.createElement('div');
            prompt.id = 'skysafe-notif-prompt';
            prompt.style.cssText = `
                position: fixed; bottom: 20px; right: 20px; z-index: 999999;
                background: #1e293b; color: #fff; padding: 16px 20px;
                border-radius: 12px; border: 1px solid #334155;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                font-family: Inter, sans-serif; display: flex; align-items: center; gap: 12px;
                animation: skysafeBannerSlide 0.4s ease;
            `;
            prompt.innerHTML = `
                <div style="font-size: 20px">🔔</div>
                <div style="flex: 1">
                    <div style="font-weight: 700; font-size: 14px">Enable Emergency Alerts?</div>
                    <div style="font-size: 12px; color: #94a3b8">Get instant notifications for disasters.</div>
                </div>
                <button id="enableNotifBtn" style="background: #00c8ff; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px">Enable</button>
                <button onclick="this.parentElement.remove()" style="background: transparent; border: none; color: #64748b; cursor: pointer; font-size: 18px">×</button>
            `;
            document.body.appendChild(prompt);

            document.getElementById('enableNotifBtn').onclick = () => {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('✅ Alerts Enabled', { body: 'You will now receive emergency broadcasts.' });
                    }
                    prompt.remove();
                });
            };
        }
    }

    // Call it after a short delay
    setTimeout(askForNotificationPermission, 2000);

    // Start everything
    loadSocketAndConnect();
})();
