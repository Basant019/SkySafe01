(function initGlobalBroadcast() {
    if (window.SkySafeBroadcastInitialized) return;
    window.SkySafeBroadcastInitialized = true;

    const SKYSAFE_API = `http://${window.location.hostname}:5000`;
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

    // --- Request permission early (on page load) ---
    if ('Notification' in window && Notification.permission === 'default') {
        // Small delay so it doesn't pop up immediately on page load
        setTimeout(() => {
            Notification.requestPermission();
        }, 3000);
    }

    // Start everything
    loadSocketAndConnect();
})();
