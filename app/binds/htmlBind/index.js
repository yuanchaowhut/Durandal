define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        var self = this;
        self.html = ko.observable();

        self.activate = function () {
            setTimeout(function () {
                var htmlStr = "<h1 style='text-align:center; color: red'>Hello World!</h1>";
                self.html(htmlStr);
            }, 1000)
        }
    }

    return ViewModel;
});
