const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'Play.zokunet.site', 
  port: 25565,
  username: 'MieAyam',
  auth: 'offline',
  version: "1.21" 
})

const namaOwner = 'rissdaym'; 

// --- FITUR AUTO EAT ---
bot.on('health', () => {
  if (bot.food < 15) { 
    const roti = bot.inventory.items().find(item => item.name.includes('bread'))
    if (roti) {
      bot.equip(roti, 'hand', (err) => {
        if (!err) {
          bot.eat((eatErr) => {
            if (!eatErr) console.log('MieAyam: Makan dulu bos biar gak mati.');
          })
        }
      })
    }
  }
});

// --- PROSES SPAWN ---
bot.on('spawn', () => {
  console.log('--- BOT MIEAYAM ONLINE (MODE NINJA) ---');
  setTimeout(() => {
    bot.chat('/register rizz rizz');
    setTimeout(() => {
      bot.chat('/login rizz');
    }, 2000);
  }, 3000);
});

// --- AUTO TPA ---
bot.on('message', (message) => {
  const chat = message.toString();
  if (chat.includes(namaOwner) && (chat.toLowerCase().includes('joined') || chat.toLowerCase().includes('masuk'))) {
    setTimeout(() => { bot.chat(`/tpa ${namaOwner}`); }, 5000); 
  }
});

// --- PERINTAH !sini ---
bot.on('chat', (username, message) => {
  if (username === namaOwner && message === '!sini') {
    bot.chat(`/tpa ${namaOwner}`);
  }
});

// --- ANTI-AFK VERSI 3 (Nengok & Swing) ---
// Cara paling aman biar gak kena 'invalid player movement'
setInterval(() => {
  if (bot.entity) {
    // Nengok ke arah random dikit biar dikira gerakin mouse
    const yaw = bot.entity.yaw + (Math.random() * 0.4 - 0.2);
    const pitch = bot.entity.pitch + (Math.random() * 0.4 - 0.2);
    bot.look(yaw, pitch, false);
    
    // Pukul angin sekali
    bot.swingArm('right');
  }
}, 30000); // Lakuin tiap 30 detik

bot.on('error', (err) => console.log('Error:', err.code));
bot.on('kicked', (reason) => console.log('Kick:', reason));
bot.on('end', () => console.log('Putus, menyambung kembali...'));
