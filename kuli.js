const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'Play.zokunet.site', 
  port: 25565,
  username: 'MieAyam',
  auth: 'offline',
  version: "1.21"
})

const namaOwner = 'rissdaym'; 

// --- FUNGSI NGETIK PELAN (TYPEWRITER EFFECT) ---
async function ngetik(pesan) {
  let teks = "";
  for (const huruf of pesan) {
    teks += huruf;
    // Jeda antar huruf (100-200ms) biar kayak ngetik beneran
    await new Promise(res => setTimeout(res, Math.random() * 100 + 100));
  }
  bot.chat(teks);
}

bot.on('spawn', () => {
  // Matikan fisika biar nggak kena kick movement
  bot.physicsEnabled = false; 
  console.log('--- MIEAYAM STANDBY (TUNGGU PERINTAH OWNER) ---');
  
  // Login otomatis tetap pake ngetik pelan setelah 7 detik join
  setTimeout(async () => {
    await ngetik('/login rizz');
  }, 7000);
});

// --- RESPON CHAT OWNER ---
bot.on('chat', async (username, message) => {
  if (username !== namaOwner) return;

  // Jika kamu ngetik "mBuD", bot bakal respon
  if (message === 'mBuD') {
    console.log('Owner panggil mBuD, proses TPA...');
    
    // Kasih jeda 2 detik sebelum mulai ngetik TPA
    setTimeout(async () => {
      await ngetik(`/tpa ${namaOwner}`);
    }, 2000);
  }

  // Tambahan perintah manual lainnya
  if (message === '!home') {
    setTimeout(async () => { await ngetik('/home'); }, 1000);
  }
  
  if (message === '!sethome') {
    setTimeout(async () => { await ngetik('/sethome'); }, 1000);
  }
});

// Auto Respawn
bot.on('death', () => {
  setTimeout(() => { bot.respawn(); }, 5000);
});

bot.on('error', (err) => console.log('Error:', err.code));
bot.on('kicked', (reason) => console.log('Kick:', JSON.stringify(reason)));
bot.on('end', () => console.log('Koneksi terputus.'));
