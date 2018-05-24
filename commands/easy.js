const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let rURL = args[0];


    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Here is a resoruce!")
        .setColor('#9B59B6')
        .addField("Link", rURL)


        let desk = message.guild.channels.find(`id`, "449189700364664832");
        message.delete().catch(O_o => {});
        desk.send(embed);

        return;
}

module.exports.help = {
    name: "easy"
}