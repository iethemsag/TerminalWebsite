


//-------------//
// DEFINITIONS //
//-------------//



let commands = {
    "about" : about,
    "setup" : setup,
    "cat" : cat, //secret
    "zerator" : zerator, ///secret
    "motd" : motd,
    "neofetch" : neofetch, //secret
    "projects" : projects,
    "error" : error,
    "moons" : moons, //secret
    "clear" : clear,
    "cls" : clear,
    "reload" : reload,
    "r" : reload,
    "date" : date, //secret
    "help" : help,
    "manul" : manul, //secret
    "repo" : repo,
    "meow" : meow, //secret
    "history" : ehistory,
    "whoami" : whoami, //secret
    "socials" : socials,
    "skills" : skills,
    "blog" : blog,
    "girlkisser" : girlkisser, // secret
    "neofetch": neofetch // secret
}

let commandBox = $('#commandBox')
let commandDisplay = $('#commandDisplay')
let commandPrefix = '<label id="commandPrefix">visitor@erdbeere.ios:~$ </label>'

let commandHistory = []
let historyIndex = -1

const clamp = (num, min, max) => Math.min(Math.max(num, min), max); // Keep value between two points



//-------------------------//
// COMMAND INPUT & HISTORY //
//-------------------------//



commandBox.on("keydown",function(evt) { // 'Enter' key is pressed
    if (evt.keyCode == 13){
        if (commandBox.val() != ""){
            historyIndex = -1   
            commandHistory.unshift(commandBox.val()) // Push command into history
            submitCommand(commandBox.val(),commandHistory[0]) // Send command to validation before parsing
        }
    } else if (evt.keyCode == 38){ // 'Up' key is pressed
        historyIndex = clamp(historyIndex+1,-1,commandHistory.length) // Making sure we are not exceeding the limits of the history and causing a null index error
        evt.preventDefault()
        commandBox.val(commandHistory[historyIndex]) // Put history value in the command box
    } else if (evt.keyCode == 40){ // 'Down' key is pressed
        historyIndex = clamp(historyIndex-1,-1,commandHistory.length)
        evt.preventDefault()
        commandBox.val(commandHistory[historyIndex])
    } else {
        historyIndex = -1
    }
})



//--------//
// &FUNCS //
//--------//




function clearConsole(){ // &func for clear command
    commandHistory = []
    commandDisplay.html("")
}

function reloadPage(){ // &func for reload command
    window.location.reload()
}

function displayHistory(){ // &func for history command
    commandHistory.map((item) => {
        commandDisplay.append(item + "<br>")
    })
}

function displayDate(){ // &func for date command
    commandDisplay.append(Date() + "<br>")
}

function updateUptime(){ // &func for neofetch command
    console.log(start)
    console.log(Date.now())
    console.log(Date.now() - start)
    uptime = Date.now() - start
    msToTime(uptime)
}

function msToTime(ms) { // &func for neofetch command
    const seconds = Math.floor(ms / 1000); // Formatting milliseconds into "X days, X hours, X minutes " format
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    const remainderHours = hours % 24; // Remainders
    const remainderMinutes = minutes % 60;
    
    const dayText = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : ''; // All values are filled
    const hourText = remainderHours > 0 ? `${remainderHours} hour${remainderHours > 1 ? 's' : ''}` : '';
    const minutesText = remainderMinutes > 0 ? `${remainderMinutes} minute${remainderMinutes > 1 ? 's' : ''}` : '';
    
    const result = [dayText, hourText, minutesText].filter(Boolean).join(', '); // If value is not null (false) then join it to the result
    
    neofetch[5] = `<pre>     <span id="nfred">it::::tt333EEF</span> <span id="nfgreen">@EEEEEEttttt33F</span>    Uptime: ${result.length > 0 ? result : 'less than a minute'}</pre>`
}



//-----------------//
// COMMAND PARSING //
//-----------------//



function submitCommand(command,value){
    commandBox.val("")
    if (command in commands){ // Command does exist
        commandDisplay.append(commandPrefix + "<span id='command'>" + value + "</span><br><br>") // Writing command name to the now-old command input
        print_command(command,value)
    } else { // Command des not exist
        commandDisplay.append(commandPrefix + "<span id='error'>" + value + "</span><br><br>")
        print_command("error",value)
    }
}

function print_command(command,value){
    if (command === "neofetch"){ // Updating time right before printing the command
        updateUptime()
    }
    commands[command].map((line) => { // Mapping each line of the command content
    let preMode = false
    if (line.substring(0,5) == "<pre>"){ // Do not append linebreaks between each line if command is written inside a <pre>
        preMode = true
    }
    if (line.split(' ')[0] == "&link"){ // If function contains &link, wait then open link
        sleep(700).then(() => {window.open(line.split(' ')[1],"_blank")})
    } else if (line.split(' ')[0] == "&func"){ // If function contains &func, wait then call function
        window[line.split(' ')[1]]() // Getting function name from the command content string
    } else {
        if (preMode){  // Do not append linebreaks between each line if command is written inside a <pre>
            commandDisplay.append(line)
        } else {
            commandDisplay.append(line + "<br>")
        }
    }
    })
    if (command != "clear"){commandDisplay.append("<br>")} // Clearing console
    preMode = false // Resetting preMode, focusing commandBox and scrolling commandBox into view
    commandBox.focus()
    commandBox.get(0).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); // Smoothing only supported on Chrome (or Opera?)
}




//---------//
// HELPERS //
//---------//



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

sleep(100).then(() => {print_command("motd","motd")})
console.log("%cDid you know there are 9 hidden commands ? Try to find them !","color:#dfa00b;font-size:20px")
console.log("%cHint : 3 of them are based on famous linux utility commands (d.../n......./w.....), and the other 6 are based off of eosis's personal interests (c../z....../m..../m.../g........./m....).","font-size:10px;color:grey")