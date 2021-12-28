define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel(params) {
        var self = this;
        self.stringValue = params.stringValue;
        self.numericValue = params.numericValue;
        self.boolValue = params.boolValue;
        self.objectValue = JSON.stringify(params.objectValue);
        self.dateValue = params.dateValue.getFullYear() + '-' + (params.dateValue.getMonth() + 1) + '-' + params.dateValue.getDate();
        self.someValue = params.someValue;
        self.someObservable = params.someObservable;
        self.someMethod = params.someMethod;

        self.handleClick = function () {
            if (self.someMethod && typeof self.someMethod === 'function') {
                self.someMethod("Observable from parent changed by child");
            }
        }

        self.title = ko.observable("我是子组件标题");
    }

    return ViewModel;
});
