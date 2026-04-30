const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'Play.zokunet.site', 
  port: 25565,
  username: 'MieAyam',
  auth: 'offline',
  version: "1.21" 
})

const namaOwner = 'rissdaym'; 

// --- FITUR AUTO EAT DENGAN DELAY MANUSIA ---
bot.on('health', () => {
  if (bot.food < 15) { 
    console.log('MieAyam: Lapar nih, mau makan tapi santai dulu...');
    
    // Jeda 2 detik sebelum mulai cari roti (biar gak instan)
    setTimeout(() => {
      const roti = bot.inventory.items().find(item => item.name.includes('bread'))
      
      if (roti) {
        // Jeda lagi sebelum pegang roti
        setTimeout(() => {
          bot.equip(roti, 'hand', (err) => {
            if (!err) {
              console.log('MieAyam: Sudah pegang roti, nunggu bentar baru makan...');
              // Jeda lagi 2 detik sebelum benar-benar makan
              setTimeout(() => {
                bot.eat((eatErr) => {
                  if (!eatErr) console.log('MieAyam: Kenyang, Alhamdulillah.');
                });
              }, 2000);
            }
          });
        }, 2000);
      }
    }, 2000);
  }
});

// --- PROSES LOGIN ---
bot.on('spawn', () => {
  console.log('--- BOT MIEAYAM ONLINE (DELAY MODE) ---');
  setTimeout(() => {
    bot.chat('/register rizz rizz');
    setTimeout(() => {
      bot.chat('/login rizz');
    }, 3000); // Jeda login diperlama
  }, 5000);
});

// --- AUTO TPA ---
bot.on('message', (message) => {
  const chat = message.toString();
  if (chat.includes(namaOwner) && (chat.toLowerCase().includes('joined') || chat.toLowerCase().includes('masuk'))) {
    setTimeout(() => { 
        bot.chat(`/tpa ${namaOwner}`); 
        console.log('Mengirim TPA ke Owner...');
    }, 7000); // Delay TPA diperlama biar gak spam
  }
});

// --- PERINTAH !sini ---
bot.on('chat', (username, message) => {
  if (username === namaOwner && message === '!sini') {
    bot.chat(`/tpa ${namaOwner}`);
  }
});

bot.on('error', (err) => console.log('Error:', err.code));
bot.on('kicked', (reason) => console.log('Kick:', reason));
bot.on('end', () => console.log('Koneksi terputus.'));
