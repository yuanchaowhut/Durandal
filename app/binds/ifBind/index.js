define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.show = ko.observable(true);
        self.toggleText = ko.pureComputed(function () {
            return self.show() ? '隐藏' : '显示';
        });
        self.toggle = toggle;

        function toggle() {
            self.show(!self.show());
        }


        self.hiden = ko.observable(false);
        self.changeText = ko.pureComputed(function () {
            return self.hiden() ? '显示' : '隐藏';
        });
        self.change = change;

        function change() {
            self.hiden(!self.hiden());
        }
    }

    return ViewModel;
});
