define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.dataList = ko.observableArray([
            {id: 1, name: '宋远桥', age: 60, selected: ko.observable(false)},
            {id: 2, name: '俞莲舟', age: 50, selected: ko.observable(false)},
            {id: 3, name: '俞岱岩', age: 45, selected: ko.observable(false)},
            {id: 4, name: '张松溪', age: 40, selected: ko.observable(false)},
            {id: 5, name: '张翠山', age: 30, selected: ko.observable(false)},
            {id: 6, name: '殷梨亭', age: 28, selected: ko.observable(false)},
            {id: 7, name: '莫声谷', age: 25, selected: ko.observable(false)},
        ]);
        self.handleSelect = handleSelect;

        function handleSelect(obj) {
            self.dataList().map(function (item) {
                item.selected(item.id === obj.id);
            });
        }
    }

    return ViewModel
});
