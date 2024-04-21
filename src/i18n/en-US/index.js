export default {
  labels: {
    webapptitle: "Interactive Proof System",
    home: "Home",
    propositional: "Propositional logic",
    firstorder: "First-order logic",
    intuitionistic: "Intuitionistic logic",
    methods: "Methods",
    naturalDeduction: "Natural deduction",
    sequentCalculus: "Gentzen sequent calculus",
    notations: "Notations",
    tree: "Notation Gentzen",
    fitch: "Fitch notation",
    start: "Start",
    back: "Back",
    hypos: "Hypotesis",
    formula: "formula",
    term: "term",
    remove: "Remove",
    cancel: "Cancel",
    use: "Use",
    sat: "SAT solver",
    help: "Help",
    getAssignments: "Find another assignments",
    downloadPNG: "Download transparent PNG",
    copyLatex: "Copy LaTeX code",
    remove: "Clear",
  },
  messages: {
    404: "Oops. Nothing here...",
    goHome: "Go Home",
    isProven: "Formula has been proven.",
    inputFormula: "Input formula.",
    formulaIsOK: "Formula is valid.",
    formulaIsNotOK: "Formula is not valid.",
    rule: "Rule ",
    applyed: " applyed on formula ",
    notApplyed: " can not be applyed on formula ",
    notApplyed: ", because there is free variable",
    termIsNotOK: "Term for substitution is not valid.",
    termInHyp: "Hypothesis includes selected term.",
    nothingToExchange: "Nothing to exchange for rule ",
    block: "Block",
    unBlock: "Unblock",
    blockText: "input for physical keyboard.",
    sat: "Formula is satisfiable.",
    unsat: "Formula is not satisfiable",
    inputDimacs: "DIMACS format is not valid.",
    invalidInput: "Invalid input for rule ",
    nomore: "No more assignments of variables found.",
    copied: "Proof copied.",
    aboutPackage: "LaTeX file embedding details",
    notCopied: "The proof has not been copied.",
    created: "Image created.",
    notCreated: "Image has not been created.",
  },
  home: {
    introText:
      "This application is used for interactive proving of logical formulas. It supports propositional, intuitionist and predicate logic. It proves using natural deduction or sequent calculus. The proof is displayed as Gentzen or Fitch notation.",
  },
  logic: {
    negation: "negation",
    conjunction: "conjunction",
    disjunction: "disjunction",
    implication: "implication",
    universalQuantifier: "universal quantifier",
    existentionalQuantifier: "existentional quantifier",
    turniket: "turniket",
    verum: "verum",
    absurdum: "absurdum",
    comma: "comma",
    leftBracket: "left bracket",
    rightBracket: "right bracket",
    space: "space",
    cnf: "CNF",
    dimacs: "DIMACS",
    dimacsVariables: "number of variables",
    dimacsClauses: "number of clauses",
    conclusion: "Conclusion",
    chooseRows: "Input row/rows",
    badRowFormat: "Bad format.",
  },
  rules: {
    ndTree: "Rules for natural deduction notation Gentzen",
    scTree: "Rules for sequent calculus notation Gentzen",
    ndFitch: "Rules for natural deduction Fitch notation",
    chooseLeaf: "Choose leaf for rule",
    chooseFormula: "Choose formula from leaf",
    chooseFormulaFor: "for rule",
    inputFormula: "Input formula for rule",
    inputFormulaFitch: "Input data for rule",
    leaves: "Tree leaves",
    formulaForInput: "Input formula",
    formulasInLeaf: "Leaf formulas",
    exchang: "exchange with",
    formula: "Formula",
    inputTerm: "Input term for substitution for rule",
    termForInput: "Term for substitution",
    identity: {
      title: "identity",
      label: "identity",
    },
    verum: {
      intro: {
        title: "verum - introduction",
        label: "introduction verum",
      },
    },
    absurdum: {
      intro: {
        title: "",
        label: "",
      },
      elimination: {
        title: "absurdum - elimination",
        label: "elimination absurdum",
        label1: "elimination absurdum 1",
        label2: "elimination absurdum 2",
      },
    },
    negation: {
      intro: {
        title: "negation - introduction",
        label: "introduction negation",
      },
      elimination: {
        title: "negation - elimination",
        label: "elimination negation",
      },
      left: {
        title: "negation - left ",
        label: "negation - left",
      },
      right: {
        title: "negation - right",
        label: "negation - right",
      },
    },
    universalQuantifier: {
      intro: {
        title: "universal quantifier - introduction",
        label: "introduction universal quantifier",
      },
      elimination: {
        title: "universal quantifier - elimination",
        label: "elimination universal quantifier",
      },
      left: {
        title: "universal quantifier - left ",
        label: "universal quantifier - left",
      },
      right: {
        title: "universal quantifier - right",
        label: "universal quantifier - right",
      },
    },
    existentionalQuantifier: {
      intro: {
        title: "existentional quantifier - introduction",
        label: "introduction existentional quantifier",
      },
      elimination: {
        title: "existentional quantifier - elimination",
        label: "elimination existentional quantifier",
      },
      left: {
        title: "existentional quantifier - left",
        label: "existentional quantifier - left",
      },
      right: {
        title: "existentional quantifier - right",
        label: "existentional quantifier - right",
      },
    },
    conjunction: {
      intro: {
        title: "conjunction - introduction",
        label: "introduction conjunction",
      },
      elimination: {
        title: "conjunction - elimination",
        label1: "elimination conjunction 1",
        label2: "elimination conjunction 2",
      },
      left: {
        title: "conjunction - left",
        label1: "conjunction - left 1",
        label2: "conjunction - left 2",
      },
      right: {
        title: "conjunction - right",
        label: "conjunction - right",
      },
    },
    disjunction: {
      intro: {
        title: "disjunction - introduction",
        label1: "introduction disjunction 1",
        label2: "introduction disjunction 2",
      },
      elimination: {
        title: "disjunction - elimination",
        label: "elimination disjunction",
      },
      left: {
        title: "disjunction - left",
        label: "disjunction - left",
      },
      right: {
        title: "disjunction - right",
        label1: "disjunction - right 1",
        label2: "disjunction - right 2",
      },
    },
    implication: {
      intro: {
        title: "implication - introduction",
        label: "introduction implication",
      },
      elimination: {
        title: "implication - elimination",
        label: "elimination implication",
      },
      left: {
        title: "implication - left",
        label: "implication - left",
      },
      right: {
        title: "implication - right",
        label: "implication - right",
      },
    },
    weakening: {
      left: {
        title: "weakening rule - left",
        label: "weakening - left",
      },
      right: {
        title: "weakening rule - right",
        label: "weakening - right",
      },
    },
    contraction: {
      left: {
        title: "contraction rule - left",
        label: "contraction - left",
      },
      right: {
        title: "contraction rule - right",
        label: "contraction - right",
      },
    },
    cut: {
      title: "cut rule",
      label: "cut",
    },
    exchange: {
      left: {
        title: "exchange rule - left",
        label: "exchange - left",
      },
      right: {
        title: "exchange rule - right",
        label: "exchange - right",
      },
    },
    assumption: {
      title: "assumption",
      label: "assumption",
    },
  },
  help: {
    howto: "How it works?",
    title1: "What is this?",
    title2: "Supported logical systems",
    title3: "Proof methods",
    title4: "Proof notations",
    title5: "Proving",
    title6: "Entering input",
    title7: "Application of the rule",
    title8: "Cookies",
    title9: "Export of proof",
    desc1:
      "The web application focuses on interactive proof of logical formulas by choosing and applying a suitable rule in a step-by-step manner. The choice of the rule is purely up to the user, so it is possible to reach a stage where the formula is not proved and it is necessary to go back and apply other rules.",
    desc2:
      "The application displays proof in the form of Gentzen and Fitch notation. In Gentzen notation, the proof is represented as a tree where each node represents one step of the proof. The proof tree is constructed from the root to the leaves. Gentzen notation is used in both proof methods offered. In Fitch notation, the proof is organized into columns, with each row containing one statement and the proof rule applied to it. This notation is used in natural deduction.",
    desc3:
      "The user can explore different possibilities of proof methods and learn through trial and error. The application also provides functionality for solving satisfiability problems of Boolean formulas, allowing to check whether a given formula is satisfiable.",
    desc4:
      "The application allows you to quickly and accurately define your logic formulas. On the left side of the screen is an input field and a virtual keyboard with logic symbols and letters of both the Latin and Greek alphabet is available to simplify input. The keyboard can convert the LaTeX code of logical symbols and letters of the Greek alphabet into visual text. Automatic string validation is performed during input and allows you to see immediately if the formula is syntactically correct. Once the formula is defined, pressing the 'Start' button activates the preparation for proof and the following display of the formula in the proof space.",
    desc5:
      "Here is the component for inputting the propositional logic formula for the Gentzen sequent calculus method.",
    desc6:
      "The process of applying rules makes it possible to gradually apply rules to formulas, and in this way to gradually evolve the proof. This allows users to interactively follow the proof process, experiment with different rules, procedures and precisely control the proof steps. This approach also makes it easier to learn how to prove logical formulas through practical exploration and experimentation.",
    desc7:
      'A list of rules is provided that are specific to the chosen logical system, method of proof, and notation of the proof. Once a specific rule is selected, the rule is applied. If the rule requires it, a section for selecting a leaf, selecting formulas, entering a formula or term, and, in the case of Fitch notation, entering line numbers is displayed. You may reverse the application of the rule by pressing the "Back" button if necessary.',
    desc8:
      "After successful completion of the proof, the information that the formula is proven will be displayed.",
    desc9:
      "The application offers the possibility to solve the SAT problem, which is a fundamental problem in the field of theory of computation and formal logic. One can choose to specify a logical formula in the form of a conjunctive normal form (CNF) or in the DIMensional Arrays of Clauses (DIMACS) format. We implemented a simple and efficient algorithm, DPLL (Davis-Putnam-Logemann-Loveland), which uses unit propagation and pure literal elimination to solve the SAT problem.",
    desc10:
      "After evaluation, the algorithm returns information about satisfiability or unsatisfiability.",
    desc11:
      "We store the following data in the web application to allow you to continue your work comfortably:",
    desc12:
      "Any data processed by the application is not used to identify users.",
    desc13:
      "The proof can be exported as a PNG file with a transparent background. This file is automatically downloaded when you click on the button ",
    desc14: "The proof can be copied as LaTeX code by clicking on the button",
    desc15:
      "In order to display this code as a proof tree you need to insert a package into the project ",
    desc16: "For Fitch notation you need to insert the package",
    cookies: {
      lang: "language",
      theme: "UI theme",
      formula: "formulas",
      method: "proof methods",
      notation: "proof notations",
      proof: "proof",
      history: "proof history",
      hypo: "hypothesis",
    },
  },
};
