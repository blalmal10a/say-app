const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("src/pages/IndexPage.vue"),
      },
      {
        name: "users",
        path: "users",
        component: () => import("src/pages/UsersPage.vue"),
      },

      {
        name: "designation",
        path: "designation",
        component: () => import("src/pages/DesignationPage.vue"),
      },

      {
        name: "attendances",
        path: "attendances",
        component: () => import("src/pages/attendances/AttendancesPage.vue"),
      },
      {
        name: "attendances-detail",
        path: "attendances/:id",
        component: () => import("src/pages/attendances/AttendancesPage.vue"),
      },

      {
        name: "attendance-form",
        path: "attendances/form/:id",
        component: () => import("src/pages/attendances/AttendanceForm.vue"),
      },

      // faith promise start

      {
        name: "faith-promises",
        path: "faith-promises",
        component: () =>
          import("src/pages/faith_promises/FaithPromisePage.vue"),
      },
      {
        name: "faith-promises-detail",
        path: "faith-promises/:id",
        component: () =>
          import("src/pages/faith_promises/FaithPromisePage.vue"),
      },

      {
        name: "faith-promise-form",
        path: "faith-promises/form/:id",
        component: () =>
          import("src/pages/faith_promises/FaithPromiseForm.vue"),
      },
      // faith promise end
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
