const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'Play.zokunet.site', 
  port: 25565,
  username: 'MieAyam',
  auth: 'offline',
  version: "1.21" 
})

const namaOwner = 'rissdaym'; 

bot.on('health', () => {
  if (bot.food < 15) { 
    const roti = bot.inventory.items().find(item => item.name.includes('bread'))
    if (roti) {
      bot.equip(roti, 'hand', (err) => {
        if (!err) bot.eat((e) => { if(!e) console.log('Makan roti...'); });
      })
    }
  }
});

bot.on('spawn', () => {
  console.log('--- BOT MIEAYAM CONNECTED ---');
  setTimeout(() => {
    bot.chat('/register rizz rizz');
    setTimeout(() => { bot.chat('/login rizz'); }, 2000);
  }, 3000);
});

bot.on('chat', (username, message) => {
  if (username === namaOwner && message === '!sini') {
    bot.chat(`/tpa ${namaOwner}`);
  }
});

setInterval(() => {
  if (bot.entity) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }
}, 45000);

bot.on('error', (err) => console.log('Error:', err.code));
bot.on('kicked', (reason) => console.log('Kick:', reason));
bot.on('end', () => console.log('Putus...'));
