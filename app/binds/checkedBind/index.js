define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.gender = ko.observable('1');   //注意这里必须给字符串，否则不会有默认选中项。
        self.genderType = ko.observable();
        self.printGender = printGender;

        function printGender() {
            var getType = Object.prototype.toString;
            self.genderType(getType.call(self.gender()));
        }


        self.balls = ko.observableArray(['1', '3']);
        self.ballsType = ko.observable();
        self.printBalls = printBalls;

        function printBalls() {
            var getType = Object.prototype.toString;
            self.ballsType(getType.call(self.balls()));
        }

    }

    return ViewModel;
});
