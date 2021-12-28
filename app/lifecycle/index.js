define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    function ViewModel() {
        var self = this;
        self.canActivate = function () {
            console.log('----------------------canActivate----------------------');
            return true;
        };
        self.activate = function () {
            console.log('----------------------activate----------------------');
        };
        self.binding = function () {
            console.log('----------------------binding------------------------');
            return {cacheViews: false};
        };
        self.bindingComplete = function () {
            console.log('----------------------bindingComplete------------------');
        };
        self.attached = function (view, parent) {
            console.log('----------------------attached--------------------------');
        };
        self.compositionComplete = function (view) {
            console.log('----------------------compositionComplete-----------------');
        };
        self.canDeactivate = function () {
            console.log('----------------------canDeactivate--------------------');
            return true
        };
        self.deactivate = function () {
            console.log('----------------------deactivate-----------------------');
        };
        self.detached = function (view) {
            console.log('----------------------detached------------------------');
        }
    }

    return ViewModel;
});
