define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.image = ko.observable('/Durandal/css/images/programer.png');
        self.link = ko.observable('http://www.baidu.com');
        self.introduction = ko.observable('北京数字政通科技股份有限公司成立于2001年,2010年在深圳证券交易所上市(股票代码:300075)是北京市认证的高新技术企业和拥有多项自主知识产权的高科技软件企业。');
        self.customAttr1 = ko.observable('自定义属性1');
        self.customAttr2 = ko.observable('自定义属性2');
    }

    return ViewModel;
});
