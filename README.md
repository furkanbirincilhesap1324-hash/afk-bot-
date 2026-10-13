first click on the bar that gives you where this folder is and delete everything to write cmd 

after cmd pops up use these commands in order 

npm install

node index.js

note:in index you need to change the txt : 

const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'yourserverip.aternos.me', 
        port: port of your server,                    
        username: 'afk_bot',            
        version: false,                 
        auth: 'offline'                 
    });

    bot.on('spawn', () => {
        console.log(`${bot.username} successfully joined the game`);
        
        // Anti-AFK: jumps every 30 secs
        setInterval(() => {
            if (bot.entity.isAlive) { // only jumps when he is alive
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);
    });

    // 🟢 auto respawn
    bot.on('death', () => {
        console.log('bot has died . Respawning!');
        setTimeout(() => {
            bot.respawn();
        }, 2000);
    });

    bot.on('end', () => {
        console.log('connection lost , retrying');
        setTimeout(createBot, 10000); 
    });

    bot.on('error', (err) => console.log('Hata:', err));
}
createBot();
