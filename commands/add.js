const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    const rProgram = args[0];
    const rPrice = args.find(p => p.startsWith('$') && !isNaN(p.replace('$', '')));
    const cheerio = require('cheerio')
    const request = require('request-promise')
    
    const url = args.find(p => p.startsWith('https'));

    function getProperties(data) {
        const $ = cheerio.load(data)
    
        const image = extractProperty($, 'image')
        const thumbnail = extractProperty($, 'thumbnail')
        const description = extractProperty($, 'description')
        const title = extractProperty($, 'title')
    
        return {image, thumbnail, description, title}
    }
    
    function extractProperty(dom, type) {
        const named = dom(`meta[name*="${type}"],meta[property*="${type}"]`).attr('content')
        return named
    }
    
    async function postEmbed(url) {
        const data = await request.get(url)
        const og = getProperties(data)

        console.log(og.title)    
        console.log(og.description)
        console.log(og.image)
        console.log(og.thumbnail)
    
        const embed = new Discord.RichEmbed()

        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(og.description)
        .setTitle(og.title)
        .setColor('#9B59B6')
        .setURL(url)
        .setThumbnail(og.thumbnail)
        .setImage(og.image)
        .addField("Price", rPrice)

        const target = message.mentions.channels.first(); // message.mentions takes into account any channel mentions in the message.
        if(!target) return message.channel.send("Message was not sent. Couldn't find channel.");

        message.delete().catch(console.error)
        target.send(embed);

        return;
    }

postEmbed(url);

}


module.exports.help = {
    name: "add"
}