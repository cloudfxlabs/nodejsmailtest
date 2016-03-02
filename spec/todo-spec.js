'use strict';

function getLastEmail() {
    var deferred = protractor.promise.defer();
    console.log("Waiting for an email...");

    mailListener.on("mail", function(mail){
        deferred.fulfill(mail);
    });
    return deferred.promise;
}


describe("gmail can", function(){

    var urlreset;
    var url;

    it("should get a mail from gmail", function(){

        browser.get("http://test.gmail.com/");
        browser.waitForAngular();
        element(By.css('a[ng-click="closeModal()"]')).click();
        element(By.name('login')).sendKeys("test@gmail.com");
        element(By.css('button[ng-click="onSubmit()"]')).click();

          browser.controlFlow().wait(getLastEmail()).then(function (email) {
          expect(email.subject).toContain("Reset your  password");
          expect(email.headers.to).toEqual("test@gmail.com");
          var emailtext = email.html;
              console.log(emailtext);
          var pattern = /href="(.*?)"/g;
          var code = emailtext.match(pattern)[1];
          var str = code.replace("href=","");
          url = str.replace(/"/g,"");
          urlreset = String(url);

      });



    });

    it("test", function() {

        browser.get(urlreset);
        //element(By.model("user.email")).sendKeys("test@gmail.com");
        element(By.model("user.password")).sendKeys("test@!23");
        element(By.css('button[ng-click="onSubmit()"]')).click();

        expect(browser.getTitle()).toContain("Dashboard");

    })

});
