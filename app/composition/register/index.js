define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        this.parentTitle = ko.observable('我是父组件标题');
    }

    function ChildViewModel() {
        this.chldTitle = ko.observable('我是子组件标题');
    }

    ko.components.register('child-comp', {
        viewModel: ChildViewModel,
        template: '<div><h2 data-bind="text: chldTitle"></h2></div>'
    });

    return ViewModel;
});
