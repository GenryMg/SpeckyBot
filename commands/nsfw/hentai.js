module.exports = {
    name: "hentai",
	description: "Gives you a hentai!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')(["randomHentaiGif","hentai"].pick(),msg);
}
