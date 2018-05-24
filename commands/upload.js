const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    const rProgram = args.splice(0, 3);
    const rName = args[1];
    const rPrice = args[2];
    const rURL = args[3];

    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("Here is a resource!")
    .setColor('#9B59B6')
    .addField("Program", rProgram)
    .addField("Name", rName)
    .addField("Price", rPrice)
    .addField("Link", rURL)

    message.channel.send(embed);

}

module.exports.help = {
    name: "upload"
}