const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "kick",
  alias: ["k", "💀"],
  desc: "Removes a participant by replying to or mentioning their message. (Admins can also be kicked)",
  react: "",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isGroup,
    isAdmins,
    isOwner,
    participants,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        // Only admins or the owner can use this command
        if (!isAdmins && !isOwner) return reply("*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*");
        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply("*📛 ι ɴєє∂ тσ вє αɴ α∂мιɴ тσ кι¢к мємвєʀs.*");
        
        // Determine the target user using reply or mention
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length > 0) {
            target = m.msg.contextInfo.mentionedJid[0];
        }
        
        if (!target) {
            return reply("❌ Please mention or reply to the message of the participant to remove.");
        }
        
        // Remove the participant from the group (admins can also be kicked)
        await conn.groupParticipantsUpdate(from, [target], "remove")
          .catch(err => {
              console.error(`⚠️ Failed to remove ${target}:`, err);
              return reply("❌ An error occurred while trying to remove the participant.");
          });
        
        // Extraire le tag à partir du JID (ex: "1234567890" sans "@s.whatsapp.net")
        const tag = target.split('@')[0];
        reply(`*@${tag} кι¢кє∂ ѕᴜᴄᴄєѕѕfᴜℓℓу😂!*`, { mentions: [target] });
    } catch (error) {
        console.error('Error while executing kick:', error);
        reply('❌ An error occurred while executing the command.');
    }
});
