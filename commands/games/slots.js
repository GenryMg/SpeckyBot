module.exports = {
    name: "slots",
	description: "Lets you play slots!",
    usage: `<slots quantity>`,
    category: `games`,
	accessableby: "Members",
    aliases: ["slot"],
    flags: ["stats"]
}

module.exports.run = async (bot, msg) => {
    let quantity = msg.guild.emojis.size;
    let slots = 3;
    let global = false;

    if(quantity < 5){
        global = true;
        quantity = bot.emojis.size
    }
    if(quantity < 5){
        return msg.channel.send("There aren't enough emotes in this server.")
    }

    if(!isNaN(msg.args[0])){
        if(msg.args[0] > 1){
            slots = Math.ceil(msg.args[0]);
        }
    }

    let eArray = [];
    let neweArray = [];

    let oldEmote;
    let won = true;

    for(let i = 0; i < slots; i++){
        let emote;

        if(global){
            emote = bot.emojis.random().toString();
        }else{
            emote = msg.guild.emojis.random().toString();
        }

        if(won){
            if(!oldEmote){
                oldEmote = emote;
            }
            won = won && (emote == oldEmote);
        }

        neweArray.push(emote);

        if(neweArray.join('').length < 1950){
            eArray = neweArray;
        }else{
            break;
        }
    }

    if(won){
        bot.stats.slots++;
    }

    await msg.channel.send(eArray.join(''));

    if(msg.flag('stats') || won){
        await msg.channel.send(`${won ? "WINNER!" : `Please Try Again!\n${slots} Slots\n${quantity} Emotes\n${quantity} / (${quantity}^${slots}) = ${(quantity / (quantity**slots)) * 100}%`}`);
    }
}
