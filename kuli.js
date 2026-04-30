const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'Play.zokunet.site', 
  port: 25565,
  username: 'MieAyam',
  auth: 'offline',
  version: "1.21" 
})

const namaOwner = 'rissdaym'; 

// --- FITUR AUTO RESPAWN & BALIK KE HOME ---
bot.on('death', () => {
  console.log('MieAyam mati! Mencoba hidup kembali...');
  setTimeout(() => {
    bot.respawn();
  }, 3000); // Jeda 3 detik buat respawn
});

// --- SETIAP KALI BOT MUNCUL (SPAWN/RESPAWN) ---
bot.on('spawn', () => {
  console.log('--- BOT MIEAYAM MASUK ---');
  
  // Kasih jeda biar posisi stabil dulu di server
  setTimeout(() => {
    // 1. Login dulu biar bisa ngetik perintah
    bot.chat('/login rizz');
    
    // 2. Tunggu 3 detik baru ngetik /home
    setTimeout(() => {
      bot.chat('/home');
      console.log('MieAyam: OTW balik ke home...');
    }, 3000);
    
  }, 7000);
});

// --- PERINTAH MANUAL DARI OWNER ---
bot.on('chat', (username, message) => {
  if (username === namaOwner) {
    if (message === '!home') {
      bot.chat('/home');
    }
    if (message === '!sethome') {
      bot.chat('/sethome');
      bot.chat('Sudah saya sethome di sini bos!');
    }
    if (message === '!sini') {
      bot.chat(`/tpa ${namaOwner}`);
    }
  }
});

// Log biar kita tau kalau ada masalah
bot.on('error', (err) => console.log('Error:', err.code));
bot.on('kicked', (reason) => console.log('Kick:', reason));
bot.on('end', () => console.log('Koneksi putus...'));
