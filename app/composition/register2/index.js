define(['durandal/app', 'durandal/system', 'knockout', './child', 'text!./child.html'], function (app, system, ko, childViewModel, template) {
    function ViewModel() {
        this.title = ko.observable('我是父组件标题');
    }

    ko.components.register('child-comp2', {
        viewModel: childViewModel,
        template: template
    });

    return ViewModel;
});
