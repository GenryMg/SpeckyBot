const { readdirSync } = require('fs')

module.exports = async (bot) => {

    let ccommands = readdirSync(`./console/`).filter(d => d.endsWith('.js'));
    ccommands.forEach(async file => {
        try{
            let pull = require(`../console/${file}`);
            bot.console.set(pull.name, pull);
            if (pull.aliases) pull.aliases.forEach(a => bot.consoleali.set(a, pull.name));
            bot.log(`${file}`.debug);
        }catch(err){
            bot.log(`${file} ERROR!`.error);
            bot.log(err.message.error);
        }
    })


    process.openStdin().addListener("data", res => {
        let oargs = res.toString().split(/\s/g).clean();
        
        if(!oargs[0]) return;

        let regex = /^[^0-9a-zA-Z]+/g

        let matches = oargs[0].match(regex)

        if(matches){
            oargs[0] = oargs[0].slice(matches[0].length)
            oargs.unshift(matches[0])
        }

        oargs = oargs.clean();

        let command = oargs[0].toLowerCase();

        args = oargs.slice(1);

        let cmd = bot.console.get(command) || bot.console.get(bot.consoleali.get(command));

        if(cmd){
            cmd.run(bot,args)
            .then(() => {
                if(bot.cache.console.debug){
                    console.log(`Command ${command.toUpperCase()} runned successfully!`.success)
                }
            })
            .catch(err => {
                if(err){
                    if(err.message){
                        err = err.message
                    }
                    console.log(err.replace('[EXPECTED] ','').trim().error)
                }else{
                    console.log("Unexpected error happend".error)
                }
            })
        }else{
            let search = bot.console.get('searchchannel');
            
            search.run(bot,oargs)
            .then(() => {
                console.log(`Channel/member changed to ${oargs[0]}`.info)
            })
            .catch(() => {
                console.log(`Command ${command.toUpperCase()} not found`.error)
            })
        }
    });
}