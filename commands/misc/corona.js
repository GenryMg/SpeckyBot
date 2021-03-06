module.exports = {
    name: "corona",
	description: "Gives you how many people are infected by corona!",
    usage: `[number]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["coronavirus"]
}

const fetch = require('node-fetch')
const { RichEmbed, Collection } = require('discord.js');
const Request = require('request');
const Api1 = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22confirmed%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22deaths%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22recovered%22%7D%5D';

module.exports.run = async (bot, msg, args) => {
    let API = 'https://coronavirus-tracker-api.herokuapp.com/confirmed';

    let res = await fetch(API, {headers: {Accept: 'application/json'}})
    let { last_updated, latest, locations } = await res.json()

    let top = new Collection();

    let topmax = isNaN(msg.args[0]) ? 5 : msg.args[0];

    if(topmax < 3){
        topmax = 3;
    }

    locations.forEach(object => {

        let t = top.get(object.country);

        if(t){
            top.set(object.country, object.latest + t);
        }else{
            top.set(object.country, object.latest);
        }
    })

    top = top.sort((a,b) => b-a);

    let string = "";
    let index = 0;

    while(index < topmax){
        string = `${string}\n${top.firstKey()}: ${top.first()}`;
        top.delete(top.firstKey());
        index++;
        if(string.length > 950){
            break;
        }
    }

    string = string.trim();

    Request({
        url: Api1,
        method: 'GET',
        json: true,
        gzip: true,
    }, (err, res, body) => {
        var stats = {
            confirmed: 0,
            deaths: 0,
            recovered: 0
        };
        body.features.forEach(obj => {
            stats.recovered += obj.attributes.recovered;
            stats.confirmed += obj.attributes.confirmed;
            stats.deaths += obj.attributes.deaths;
        });

    let embed = new RichEmbed()
    .setTitle('CoronaVirus')
    .addField(":white_check_mark: Total confirmed cases",`${latest} cases`)
    .addField(":skull: Total deaths", stats.deaths)
    .addField(":repeat: Total Recovered", stats.recovered)
    .addBlankField()
    .addField(`Top ${index} Locations`,string)
    .setColor('FF00AA')
    .setFooter("Last update")
    .setTimestamp(Date.parse(last_updated))

    msg.channel.send(embed)
})
}
