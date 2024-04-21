const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // homepage
      {
        path: "",
        name: "homapge",
        component: () => import("pages/IndexPage.vue"),
      },
      // propositional logic
      {
        path: "propositional-logic",
        name: "propositional",
        component: () => import("pages/PropositionalLogic.vue"),
      },
      // first order logic
      {
        path: "first-order-logic",
        name: "firstorder",
        component: () => import("pages/FirstOrderLogic.vue"),
      },
      // intuitionistic logic
      {
        path: "intuitionistic-logic",
        name: "intuitionistic",
        component: () => import("pages/IntuitionisticLogic.vue"),
      },
      // SAT solver
      {
        path: "sat-solver",
        name: "sat",
        component: () => import("pages/SatSolver.vue"),
      },
      // How to
      {
        path: "help",
        name: "help",
        component: () => import("pages/HelpPage.vue"),
      },
      {
        path: "user-testing",
        name: "user-testing",
        component: () => import("pages/TestingPage.vue"),
      },
    ],
  },
  // catch
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
