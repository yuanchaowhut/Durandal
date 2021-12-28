define(['plugins/router', 'knockout'], function(router, ko) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'composition',
            fromParent:true
        }).map([
            { route: ['', 'compose'],    moduleId: 'compose/index',       title: 'Compose',      nav: true },
            { route: ['register'],       moduleId: 'register/index',      title: 'Register',     nav: true },
            { route: ['register2'],      moduleId: 'register2/index',     title: 'Register2',    nav: true },
            { route: ['register3'],      moduleId: 'register3/index',     title: 'Register3',    nav: true },
            { route: ['setRoot'],        moduleId: 'setRoot/index',       title: 'SetRoot',      nav: true },
        ]).buildNavigationModel();

    return {
        router: childRouter,
    };
});
