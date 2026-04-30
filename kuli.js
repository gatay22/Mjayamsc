const mineflayer = require('mineflayer')

// --- KONFIGURASI BOT ---
const bot = mineflayer.createBot({
  host: 'Play.zokunet.site', 
  port: 25565,
  username: 'MieAyam',
  auth: 'offline',
  version: "1.21" 
})

const namaOwner = 'rissdaym'; 

// --- FITUR AUTO EAT (MAKAN ROTI OTOMATIS) ---
bot.on('health', () => {
  if (bot.food < 15) { 
    // Cari roti di tas
    const roti = bot.inventory.items().find(item => item.name.includes('bread'))
    
    if (roti) {
      // Pegang roti dulu baru makan
      bot.equip(roti, 'hand', (err) => {
        if (!err) {
          bot.eat((eatErr) => {
            if (eatErr) console.log('Gagal makan:', eatErr)
            else console.log('MieAyam: Kenyang habis makan roti.');
          })
        }
      })
    }
  }
});

// --- PROSES SPAWN & LOGIN ---
bot.on('spawn', () => {
  console.log('--- BOT MIEAYAM CONNECTED ---');
  
  // Kasih jeda biar server gak kaget
  setTimeout(() => {
    bot.chat('/register rizz rizz');
    setTimeout(() => {
      bot.chat('/login rizz');
      console.log('Login sukses!');
    }, 2000);
  }, 3000);
});

// --- FITUR AUTO TPA KE OWNER ---
bot.on('message', (message) => {
  const chat = message.toString();
  if (chat.includes(namaOwner) && (chat.toLowerCase().includes('joined') || chat.toLowerCase().includes('masuk'))) {
    setTimeout(() => { 
      bot.chat(`/tpa ${namaOwner}`); 
    }, 5000); 
  }
});

// --- PERINTAH MANUAL !sini ---
bot.on('chat', (username, message) => {
  if (username === namaOwner && message === '!sini') {
    bot.chat(`/tpa ${namaOwner}`);
  }
});

// --- ANTI-AFK (MAJU MUNDUR BIAR GAK KENA KICK) ---
setInterval(() => {
  if (bot.entity) {
    // Gerak maju sebentar
    bot.setControlState('forward', true);
    setTimeout(() => {
      bot.setControlState('forward', false);
      
      // Jeda dikit terus gerak mundur balik ke posisi awal
      setTimeout(() => {
        bot.setControlState('back', true);
        setTimeout(() => bot.setControlState('back', false), 500);
      }, 500);
      
    }, 500);
  }
}, 60000); // Eksekusi setiap 1 menit

// --- LOG ERROR ---
bot.on('error', (err) => console.log('Error:', err.code));
bot.on('kicked', (reason) => console.log('Kick Reason:', reason));
bot.on('end', () => console.log('Koneksi terputus.'));
