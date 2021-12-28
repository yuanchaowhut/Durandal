define(['durandal/app', 'durandal/system', 'durandal/composition', 'knockout'], function (app, system, composition, ko) {
    function ViewModel() {
        var self = this;
        self.content = ko.observable('我是内容1');
        self.name = ko.observable();
        self.age = ko.observable();

        composition.addBindingHandler('Content1Handler', {
            init: function (dom) {
                var data = self._$_param || {};
                self.name(data.name);
                self.age(data.age);
            }
        });
    }

    return ViewModel;
});
