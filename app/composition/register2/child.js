define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    function ViewModel() {
        this.title = ko.observable('我是子组件标题');
    }

    return ViewModel;
});
