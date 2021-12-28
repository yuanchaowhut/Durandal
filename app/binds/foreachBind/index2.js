define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.students = ko.observableArray([
            {stuNo: 1001, stuName: '张三', age: 18},
            {stuNo: 1002, stuName: '香蕉', age: 19},
            {stuNo: 1003, stuName: '梨子', age: 20},
            {stuNo: 1004, stuName: '菠萝', age: 17},
            {stuNo: 1005, stuName: '橘子', age: 16},
        ]);
    }

    return ViewModel
});
