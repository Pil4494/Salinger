const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true}) // Defines the bot.
bot.commands = new Discord.Collection();

bot.on("ready", async () => { // Verifies that bot is on in console, and sets its "Playing" function
    console.log(`Bot is Ready! ${bot.user.username}`);
    bot.user.setActivity("your thoughts", {type: "LISTENING"});
});




bot.on("message", async message => { // Bot checks messages for many things

    if(message.author.bot) return; // Checks to see if messager is a bot.
    if(message.channel.type === "dm") return; // Checks to see if it is in a DM

    let prefix = botSettings.prefix; //Sets the prefix as "!"
    let messageArray = message.content.split(" "); //Checks for spaces, creates each "word" as an array
    let cmd = messageArray[0]; 
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);


    if(cmd === `${prefix}botinfo`){

        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Info")
        .setColor("#15f153")
        .addField("Bot Name", bot.user.username);

        return message.channel.send(botembed);

    }

});

fs.readdir("./commands/", (err, files) =>{ // Checks for files in the console.
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0){
        console.log("No Commands to load!");
        return;
    }
    console.log(`Loading ${jsfiles.length} commands!`);

    
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});





bot.login(botSettings.token);