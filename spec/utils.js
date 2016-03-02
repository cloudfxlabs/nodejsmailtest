
'use strict';

module.exports = function()
{
  var api = {};

  api.getLastEmail = function getLastEmail()
  {
    var deferred = protractor.promise.defer();
    console.log("Waiting for an email...");

    mailListener.on("mail", function(mail){
    deferred.fulfill(mail);
    });
    return deferred.promise;
  };

  return api;
};
