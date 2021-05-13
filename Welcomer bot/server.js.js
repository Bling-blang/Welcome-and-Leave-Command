const discord = require("discord.js)
Client.commands = new Discord.Collection();
const fs = require("fs");

fs.readdirSync("./commands/").forEach(dir => {

  fs.readdir(`./commands/${dir}`, (err, files) => {

    if (err) throw err;
 
    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
      console.log("Can't find any commands!");
      return;
    }

    jsFiles.forEach(file => {
      var fileGet = require(`./commands/${dir}/${file}`);
      console.log(`File ${file} was loaded`);
      try {
        Client.commands.set(fileGet.help.name, fileGet);
        fileGet.help.aliases.forEach(alias => {
          Client.aliases.set(alias, fileGet.help.name);
        });
      } catch (err) {
        return console.log(err);
      }
    });
  });
});

Client.on("ready", async () => {
  console.log(`${Client.user.username} is Online!`);
});

Client.on('guildMemberAdd', async member => {
           
    let welcomeChannel = db.fetch(`welcome_${member.guild.id}`)
    if (welcomeChannel === null) return
    const channel = member.guild.channels.cache.find(ch => ch.id === welcomeChannel);
    let joinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    if (joinMsg === null) {
        db.set(`joinmsg_${member.guild.id}`, `Welcome {member:mention} to **{server:name}**\nAccount Create At : {member:createdAt}\nTotal {server:members} Member In Server `)
    } 
       
    let newJoinMsg = db.fetch(`joinmsg_${member.guild.id}`)
    let content = newJoinMsg
        .replace(/{member:mention}/g, `<@${member.user.id}>`)
        .replace(/{member:name}/g, `${member.user.username}`)
        .replace(/{member:id}/g, `${member.user.id}`)
        .replace(/{member:tag}/g, `${member.user.tag}`)
        .replace(/{member:createdAt}/g, `${moment(member.user.createdAt).format('LLLL')}`)
        .replace(/{server:name}/g, `${member.guild.name}`)
        .replace(/{server:members}/g, `${member.guild.members.cache.size}`)
        .replace(/{server:members}/g, `${member.guild.members.cache.size}`)
  
     member.guild.channels.cache.get(welcomeChannel).send(content)
  });
Client.on('guildMemberRemove', async member => {
           
    let leaveChannel = db.fetch(`leave_${member.guild.id}`)
      if (leaveChannel === null) return
    const channel = member.guild.channels.cache.find(ch => ch.id === leaveChannel);
   let leaveMsg = db.fetch(`leavemsg_${member.guild.id}`)
    if (leaveMsg === null) {
        db.set(`leavemsg_${member.guild.id}`, `😢 {member:name} just left the server... We are down to {server:members} members... `)
    }

    let newJoinMsg = db.fetch(`leavemsg_${member.guild.id}`)
    let content = newJoinMsg
        .replace(/{member:mention}/g, `<@${member.user.id}>`)
        .replace(/{member:name}/g, `${member.user.username}`)
        .replace(/{member:id}/g, `${member.user.id}`)
        .replace(/{member:tag}/g, `${member.user.tag}`)
        .replace(/{member:createdAt}/g, `${moment(member.user.createdAt).format('LLLL')}`)
        .replace(/{server:name}/g, `${member.guild.name}`)
        .replace(/{server:members}/g, `${member.guild.members.cache.size}`)
        .replace(/{server:members}/g, `${member.guild.members.cache.size}`)
 
     member.guild.channels.cache.get(leaveChannel).send(content)
})

Client.login("YOUR BOT TOKEN")