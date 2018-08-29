;
(function (global, $) {
    // 'new' an object
    var Greetr = function (firstName, lastname, language) {
        return new Greetr.init(firstName, lastname, language);
    }
    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es', 'fr', 'ur', 'ar'];
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Bonjour',
        ur: 'ہیلو',
        ar: 'مرحبا'
    };
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        fr: 'salutation',
        ur: 'سلام',
        ar: 'تحية'
    };
    // logger messages
    var logMessages = {
        en: 'Loggedin',
        es: 'Inicio sesion',
        fr: 'connecté',
        ur: 'لاگ ان',
        ar: 'تسجيل الدخول'
    };
    // prototype holds methods to save memory space
    Greetr.prototype = {
        // 'this' refers to the calling object at execution time
        fullname: function () {
            return this.firstName + ' ' + this.lastname;
        },
        validate: function () {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid Language";
            }
        },
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        formalGreeting: function () {
            return formalGreetings[this.language] + ' ' + this.fullname() + ' You are Successfully ' + logMessages[this.language];
        },
        // chainable method return their own object
        greet: function (formal) {
            var msg;
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }
            // 'this' refers to the calling object at execution time
            // make the method chainable
            return this;
        },

        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname());
            }
            return this;
        },
        // set the language
        setLang: function (lang) {
            this.language = lang;
            // validate
            this.validate();
            // make chainable
            return this;
        },
        HTMLGreeting: function (selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            // make chainable
            return this;
        }
    };
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function (firstName, lastname, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
        self.validate();
    }
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor finger
    global.Greetr = global.G$ = Greetr;
}(window, jQuery));