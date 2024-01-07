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
