define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.show = ko.observable(true);
        self.dataList = ko.observableArray([]);
    }

    return ViewModel;
});
