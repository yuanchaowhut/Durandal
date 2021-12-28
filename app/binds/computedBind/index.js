define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        //fullName例子
        self.firstName = ko.observable('');
        self.lastName = ko.observable('');
        self.fullName = ko.pureComputed(function () {
            return this.firstName() + ' ' + this.lastName();
        }, this);
        // 如果使用self则this也可以不传
        // self.fullName = ko.pureComputed(function () {
        //     return self.firstName() + ' ' + self.lastName();
        // });

        //火车票例子
        self.carriageNumber = ko.observable('');
        self.seatNumber = ko.observable('');
        self.ticket = ko.pureComputed({
            read: function () {
                return this.carriageNumber() + ' ' + this.seatNumber();
            },
            write: function (value) {
                if (value && value.lastIndexOf(' ') > 0) {
                    var arr = value.split(/\s+/);
                    this.carriageNumber(arr[0] || '');
                    this.seatNumber(arr[1] || '');
                }
            },
            owner: this
        });
        // 如果使用self则owner:this也可以不要
        // self.ticket = ko.pureComputed({
        //     read: function () {
        //         return self.carriageNumber() + ' ' + self.seatNumber();
        //     },
        //     write: function (value) {
        //         if (value && value.lastIndexOf(' ') > 0) {
        //             var arr = value.split(/\s+/);
        //             self.carriageNumber(arr[0] || '');
        //             self.seatNumber(arr[1] || '');
        //         }
        //     }
        // });
    }

    return ViewModel
});
