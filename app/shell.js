define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            return router.map([
                { route: ['', 'home'],                          moduleId: 'hello/index',                title: 'Hello World',           nav: true },
                { route: 'binds*details',                       moduleId: 'binds/index',                title: 'KO Binds',              nav: true },
                { route: 'composition*details',                 moduleId: 'composition/index',          title: 'Composition',           nav: true },
                { route: 'event',                               moduleId: 'event/index',                title: 'Events',                nav: true },
                { route: 'lifecycle',                           moduleId: 'lifecycle/index',            title: 'Lifecycle',             nav: true },
            ]).buildNavigationModel()
              .mapUnknownRoutes('hello/index', 'not-found')
              .activate();
        }
    };
});
