define(['plugins/router', 'knockout'], function(router, ko) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'binds',
            fromParent:true
        }).map([
            { route: ['', 'textBind'],    moduleId: 'textBind/index',       title: 'Text Bind',           type: 'basic',      nav: true },
            { route: ['htmlBind'],        moduleId: 'htmlBind/index',       title: 'Html Bind',           type: 'basic',      nav: true },
            { route: ['valueBind'],       moduleId: 'valueBind/index',      title: 'Value Bind',          type: 'basic',      nav: true },
            { route: ['optionsBind'],     moduleId: 'optionsBind/index',    title: 'Options Bind',        type: 'basic',      nav: true },
            { route: ['checkedBind'],     moduleId: 'checkedBind/index',    title: 'Checked Bind',        type: 'basic',      nav: true },
            { route: ['enableBind'],      moduleId: 'enableBind/index',     title: 'Enable Bind',         type: 'basic',      nav: true },
            { route: ['disableBind'],     moduleId: 'disableBind/index',    title: 'Disable Bind',        type: 'basic',      nav: true },
            { route: ['attrBind'],        moduleId: 'attrBind/index',       title: 'Attr Bind',           type: 'basic',      nav: true },
            { route: ['visibleBind'],     moduleId: 'visibleBind/index',    title: 'Visible Bind',        type: 'basic',      nav: true },
            { route: ['styleBind'],       moduleId: 'styleBind/index',      title: 'Style Bind',          type: 'basic',      nav: true },
            { route: ['cssBind'],         moduleId: 'cssBind/index',        title: 'CSS Bind',            type: 'basic',      nav: true },
            { route: ['computedBind'],    moduleId: 'computedBind/index',   title: 'Computed Bind',       type: 'basic',      nav: true },
            { route: ['ifBind'],          moduleId: 'ifBind/index',         title: 'If Bind',             type: 'control',    nav: true },
            { route: ['foreachBind'],     moduleId: 'foreachBind/index',    title: 'Foreach Bind',        type: 'control',    nav: true },
            { route: ['withBind'],        moduleId: 'withBind/index',       title: 'With Bind',           type: 'control',    nav: true },
            { route: ['clickBind'],       moduleId: 'clickBind/index',      title: 'Click Bind',          type: 'event',      nav: true },
            { route: ['eventBind'],       moduleId: 'eventBind/index',      title: 'Event Bind',          type: 'event',      nav: true },
            { route: ['eventArgs'],       moduleId: 'eventArgs/index',      title: 'Event Args',          type: 'event',      nav: true },
            { route: ['customBind'],      moduleId: 'customBind/index',     title: 'Custom Bind',         type: 'custom',     nav: true },
            { route: ['compositionBind'], moduleId: 'compositionBind/index',title: 'Composition Bind',    type: 'custom',     nav: true },
        ]).buildNavigationModel();

    return {
        router: childRouter,
        basicSamples: ko.computed(function() {
            return childRouter.navigationModel().filter(function(item){
                return item.type === "basic";
            });
        }),
        controlSamples: ko.computed(function() {
            return childRouter.navigationModel().filter(function(item){
                return item.type === "control";
            });
        }),
        eventSamples: ko.computed(function() {
            return childRouter.navigationModel().filter(function(item){
                return item.type === "event";
            });
        }),
        customSamples: ko.computed(function() {
            return childRouter.navigationModel().filter(function(item){
                return item.type === "custom";
            });
        })
    };
});
