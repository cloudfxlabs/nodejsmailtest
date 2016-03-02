var MailListener = require("mail-listener2");
var regexp = require('node-regexp');
var re = regexp();



var mailListener = new MailListener({
  username: "test@gmail.com",
  password: "test@123",
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX",
  markSeen: true,
  fetchUnreadOnStart: true,
  attachments: true,
  attachmentOptions: { directory: "attachments/" }
});

mailListener.start();

mailListener.on("server:connected", function(){
  console.log("imap gmail Connected");
});

mailListener.on("server:disconnected", function(){
  console.log("imap gmail Disconnected");
});

mailListener.on("error", function(err){
  console.log(err);
});

mailListener.on("mail", function(mail){
  console.log(mail);
  console.log(mail.html);
  console.log(mail.headers.to);
  console.log(re.start('http'));
  console.log(mail.html);

});

mailListener.on("attachment", function(attachment){
  console.log(attachment);
});
