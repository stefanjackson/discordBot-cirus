require('dotenv').config(); 
const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const { default: mongoose } = require('mongoose');
const cirusSchema = require('./cirus-schema');

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
}); 

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  await mongoose.connect(
    process.env.MONGO_URI
  , {
    keepAlive: true,
  })
});

console.log('test1');

client.on('messageCreate', async msg => {
  switch (msg.content) {
    case "ping":
      msg.reply("Pong!");
      break;
      
    case "!price":
      msg.channel.send("Here is your current price:");

      async function getPrice() {
        let response = null;

        new Promise(async (resolve, reject) => {
          try {
            response  = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=CIRUS', {
              headers: {
                'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
              },
            });
          } catch(ex) {
            response = null;
            console.log(ex);
            reject(ex);
          }
          if (response) {
            const price = response.data.data.CIRUS[0].quote.USD.price;
            console.log(JSON.parse(price));
            resolve(price);
            msg.channel.send(`${price}`);
          }
        })
      }
      getPrice();
      break;

    case "!save":
      msg.channel.send("Saved price");

      async function savePrice() {
        let response = null;

        new Promise(async (resolve, reject) => {
          try {
            response  = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=CIRUS', {
              headers: {
                'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
              },
            });
          } catch(ex) {
            response = null;
            console.log(ex);
            reject(ex);
          }
          if (response) {
            const price = response.data.data.CIRUS[0].quote.USD.price;
            const time = response.data.status.timestamp;
            console.log(JSON.parse(price));
            resolve(price);
            const newPrice = new cirusSchema({
              price: price,
              time: time,
            });
            newPrice.save();
          }
        })
      }
      savePrice();
      break;
   }
})



client.login(process.env.CLIENT_TOKEN); 