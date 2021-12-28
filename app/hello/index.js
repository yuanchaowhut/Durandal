define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    var hello1 = ko.observable("hello world 1!");

    var handleChange = function (vm, evt) {
        var id = evt.target.id;
        if (id === "hello2") {
            this.hello2 += '2';
        } else {
            this.hello3(this.hello3() + 3);
        }
    };

    var handlePrint = function () {
        console.log("hello2:" + this.hello2);
        console.log("hello3:" + this.hello3());
    };

    return {
        hello1: hello1,
        hello2: "hello world 2!",
        hello3: ko.observable("hello world 3!"),
        handleChange: handleChange,
        handlePrint: handlePrint
    };
});
