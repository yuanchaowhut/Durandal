define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    //模板1
    function ViewModel() {
        var self = this;
        self.text = ko.observable(0);
        self.changeText = changeText;

        function changeText() {
            self.text(self.text() + 1);
        }
    }

    return ViewModel;

    //模板2
    // var text = ko.observable(0);
    // var changeText = function () {
    //     text(text() + 1);
    // };
    // return {
    //     text: text,
    //     changeText: changeText
    // }

    //模板3
    // return {
    //     text: ko.observable(0),
    //     changeText: function () {
    //         this.text(this.text() + 1);
    //     }
    // }
});
