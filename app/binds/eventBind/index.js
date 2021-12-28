define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        //鼠标移入移出事件
        self.mouseIn = ko.observable(false);
        self.handleMouseEnter = function () {
            self.mouseIn(true);
        };

        self.handleMouseLeave = function () {
            self.mouseIn(false);
        };

        //change事件
        self.hobbies = ko.observableArray([
            {id: 1, name: '乒乓球'},
            {id: 2, name: '篮球'},
            {id: 3, name: '羽毛球'},
            {id: 4, name: '排球'}
        ]);
        self.selectedHobbyId = ko.observable(self.hobbies()[0].id);
        self.selectedHobbyName = ko.observable(self.hobbies()[0].name);
        self.changeHobby = changeHobby;

        function changeHobby() {
            var id = self.selectedHobbyId();
            var res = self.hobbies().find(function (item) {
                return item.id === id;
            });
            self.selectedHobbyName(res.name);
        }
    }

    return ViewModel;
});
