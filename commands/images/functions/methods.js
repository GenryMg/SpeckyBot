const { read } = require('jimp')
const { unlink } = require('fs')

module.exports = async (bot, msg, method, free, [val, min, max],fileFormat) => {
    async function manipulation(){
        let { Args } = msg;

        Args[0] = parseInt(Args[0])

        let intensity = val;

        if(typeof intensity != "boolean"){

            if(!free){
                if(!isNaN(Args[0])){
                    intensity = Number(Args[0]);
                }
                if(intensity > max){
                    intensity = max
                }
                if(intensity < min){
                    intensity = min
                }
            }else{
                intensity = Number(Args[0])
            }
        }else{
            intensity = null;
        }

        let image    = bot.cache.lastImage[msg.channel.id]; 
        let id       = bot.snowflake();

        if(image == undefined){ msg.channel.send("No image found"); return; }

        if(!fileFormat){fileFormat = "png"}

        msg.channel.send("Image is getting processed...").then( response => {

            read(image, (err, file) => {
                if (err){ msg.channel.send("Error happend") };

                function run(){
                    msg.channel.send( '',  { files: [id + `.${fileFormat}`] }).then((ree)=>{
                        response.delete();
                        unlink(`./${id}.${fileFormat}`, () => {})
                        bot.cache.lastImage[msg.channel.id] = ree.attachments.first().proxyURL;
                    })
                }

                if(intensity != null){
                    file[method](intensity);
                    file.autocrop().write(id + `.${fileFormat}`, ()=>{
                        run();
                    })
                }else{
                    file[method]();
                    file.autocrop().write(id + `.${fileFormat}`, ()=>{
                        run();
                    })
                }
            })
        })
    }
    await manipulation();
}
