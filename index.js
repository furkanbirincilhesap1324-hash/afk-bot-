const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'FraudSFMSMP.aternos.me', 
        port: 21699,                    
        username: 'afk_bot',            
        version: false,                 
        auth: 'offline'                 
    });

    bot.on('spawn', () => {
        console.log(`${bot.username} başarıyla sunucuya bağlandı!`);
        
        // Anti-AFK: Her 30 saniyede bir zıplar
        setInterval(() => {
            if (bot.entity.isAlive) { // Sadece hayattaysa zıplar
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // 🟢 OTOMATİK YENİDEN DOĞMA (AUTO-RESPAWN)
    bot.on('death', () => {
        console.log('Bot öldü! 2 saniye içinde yeniden doğuluyor...');
        setTimeout(() => {
            bot.respawn();
        }, 2000);
    });

    bot.on('end', () => {
        console.log('Bağlantı düştü. 10 saniye sonra tekrar deniyor...');
        setTimeout(createBot, 10000); 
    });

    bot.on('error', (err) => console.log('Hata:', err));
}
createBot();
