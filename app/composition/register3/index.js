define(['durandal/app', 'durandal/system', 'knockout', './child', 'text!./child.html'], function (app, system, ko, childViewModel, template) {
    function ViewModel() {
        var self = this;
        self.title = ko.observable("我是父组件标题");
        self.someValue = 'Prop from parent';
        self.someObservable = ko.observable('Observable from parent');
        self.someMethod = function (data) {
            self.someObservable(data);
        };

        self.handleClick = function () {
            self.someObservable('Observable from parent changed by parent!');
        }
    }

    ko.components.register('child-comp3', {
        viewModel: childViewModel,
        template: template
    });

    return ViewModel;
});
