module.exports = {
    name: "boobs",
	description: "Gives you boobs!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["boob","titts","tits","tit","titt"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["tits","boobs"].pick(),msg); //removed: smallBoobs
}
