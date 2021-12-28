define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;

        //基础用法
        self.fruits = ko.observableArray([
            {id: 1, name: '苹果', value: 'apple'},
            {id: 2, name: '香蕉', value: 'banana'},
            {id: 3, name: '梨子', value: 'pear'},
            {id: 4, name: '菠萝', value: 'pineapple'}
        ]);
        self.selectedFruit = ko.observable();


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


        //optionsCaption
        self.languages = ko.observableArray([
            {id: 1, name: 'Java'},
            {id: 2, name: 'Javascript'},
            {id: 3, name: 'C++'},
            {id: 4, name: 'Python'}
        ]);
        self.languageId = ko.observable();
        self.languageName = ko.observable();
        self.changeLanguage = changeLanguage;

        function changeLanguage() {
            var id = self.languageId();
            //必须判断
            if (id === undefined) {
                self.languageName("");
                return;
            }
            var res = self.languages().find(function (item) {
                return item.id === id;
            });
            self.languageName(res.name);
        }


        //手动加一个头
        self.hairs = ko.observableArray([
            {id: 0, name: '请选择'},
            {id: 1, name: '长发'},
            {id: 2, name: '短发'},
            {id: 3, name: '卷毛'},
            {id: 4, name: '光头'}
        ]);
        self.hairId = ko.observable();
        self.hairName = ko.observable();
        self.changeHair = changeHair;

        function changeHair() {
            var id = self.hairId();
            var res = self.hairs().find(function (item) {
                return item.id === id;
            });
            self.hairName(res.name);
        }


        //multiple select 按住shift键可多选
        self.provinces = ko.observableArray([
            {id: 1, name: '湖北省'},
            {id: 2, name: '湖南省'},
            {id: 3, name: '四川省'},
            {id: 4, name: '河南省'},
            {id: 5, name: '江西省'}
        ]);
        self.provinceIds = ko.observable();
        self.provinceNames = ko.observable();
        self.changeProvince = changeProvince;

        function changeProvince() {
            var ids = self.provinceIds();
            var res = self.provinces().filter(function (item) {
                return ids.indexOf(item.id) !== -1;
            });
            var names = res.map(function (item) {
                return item.name
            }).join(',');
            self.provinceNames(names);
        }


        //默认选中1个
        self.brands = ko.observableArray([
            {id: 0, name: '请选择'},
            {id: 1, name: '宝马'},
            {id: 2, name: '奔驰'},
            {id: 3, name: '奥迪'},
            {id: 4, name: '大众'}
        ]);
        self.brandId = ko.observable(3); //默认选中奥迪

        //默认选中多个
        self.units = ko.observableArray([
            {id: 1, name: '阿里巴巴'},
            {id: 2, name: '腾讯'},
            {id: 3, name: '小米'},
            {id: 4, name: '百度'},
            {id: 5, name: '数字政通'}
        ]);
        self.unitIds = ko.observableArray([1, 3, 5]); //默认选中阿里巴巴、小米、数字政通
    }

    return ViewModel;
});
