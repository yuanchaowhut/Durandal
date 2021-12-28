define(['durandal/app', 'durandal/system', 'durandal/composition', 'knockout', 'jquery'], function (app, system, composition, ko, $) {
    function ViewModel() {
        var $dom = null;

        composition.addBindingHandler('myCustomHandler', {
            init: function (dom) {
                $dom = $(dom);

                // var width = $("#test").css("width");

                var width = $dom.find("#test").css("width");

                console.log('----------test------------width：' + width);
            },
            update: function (dom) {

            }
        });
    }

    return ViewModel;
});
