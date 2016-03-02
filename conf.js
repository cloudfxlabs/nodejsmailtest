exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/todo-spec.js'],
  multiCapabilities: [
    {
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 1

    }
  ],
  allScriptsTimeout: 20000,
  getPageTimeout: 15000,


onPrepare: function () {
  var MailListener = require("mail-listener2");
  var mailListener = new MailListener
  ({
    username: "test@gmail.com",
    password: "test@123",
    host: "imap.gmail.com",
    port: 993, // imap port
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
  console.log("Mail listener initialized");
});

  mailListener.on("server:disconnected", function(){
    console.log("imapDisconnected");
  });

  mailListener.on("mail", function(){
    console.log("GO IT!");
  });

  global.mailListener = mailListener;

},

  jasmineNodeOpts: {

    onComplete: function () {
      mailListener.stop();
    },
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 9999999
  },




};
