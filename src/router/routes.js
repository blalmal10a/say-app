const routes = [
  {
    path: "/",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        meta: {
          requires_auth: false,
        },
        component: () => import("src/pages/IndexPage.vue"),
      },
      {
        name: "users",
        path: "users",
        meta: {
          requires_auth: true,
        },
        component: () => import("src/pages/UsersPage.vue"),
      },

      {
        name: "designation",
        path: "designation",
        meta: {
          requires_auth: true,
        },
        component: () => import("src/pages/DesignationPage.vue"),
      },

      {
        name: "attendances",
        path: "attendances",
        meta: {
          requires_auth: true,
        },
        component: () => import("src/pages/attendances/AttendancesPage.vue"),
      },
      {
        name: "attendance-detail",
        path: "attendances/:_id",
        meta: {
          parent: [
            'attendances'
          ],
          requires_auth: true,
        },
        component: () => import("src/pages/attendances/AttendanceDetail.vue"),
      },

      {
        name: "attendance-form",
        path: "attendances/form/:_id",
        meta: {
          parent: [
            'attendances'
          ],
          requires_auth: true,
        },
        component: () => import("src/pages/attendances/AttendanceForm.vue"),
      },

      // faith promise start

      {
        name: "faith-promises",
        path: "faith-promises",
        meta: {
          requires_auth: true,
        },
        component: () =>
          import("src/pages/faith_promises/FaithPromisePage.vue"),
      },
      {
        name: "faith-promise-detail",
        path: "faith-promises/:_id",
        meta: {
          parent: [
            'faith-promises'
          ],
          requires_auth: true,
        },
        component: () =>
          import("src/pages/faith_promises/FaithPromiseDetail.vue"),
      },

      {
        name: "faith-promise-form",
        path: "faith-promises/form/:_id",
        meta: {
          parent: [
            'faith-promises'
          ],
          requires_auth: true,
        },
        component: () =>
          import("src/pages/faith_promises/FaithPromiseForm.vue"),
      },

      {
        name: "login",
        path: "/auth/login",
        meta: {
          requires_auth: false,
        },
        component: () => import("src/pages/auth/LoginPage.vue"),
      },
      // faith promise end
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    meta: {
      requires_auth: true,
    },
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
