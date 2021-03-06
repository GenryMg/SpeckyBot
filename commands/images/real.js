module.exports = {
    name: "contrast",
	description: "Applies a contrast to the image!",
    usage: `[Amount (-100 - 100)]`,
    category: `images`,
	accessableby: "Members",
    aliases: ["real"],
    perms: [],
    cmdperms: []
}

module.exports.run = async (bot, msg) => {
    if(msg.args){
        msg.args[0] = Number(msg.args[0]) / 100
    }
    require('./functions/methods')(bot, msg,'contrast',false,[0.5,-1,1],"png")
}
