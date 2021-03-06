module.exports = async () => {    
    require('more-array-methods')();

    require('colors').setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'blue',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red',
        cmd: 'magenta',
        success: 'green',
        startupinfo: 'grey',
        dms: 'grey',
        fail: 'red',
        failed: 'red',
        fatal: ['black','bgRed']
    });
}