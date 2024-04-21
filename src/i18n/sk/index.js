export default {
  labels: {
    webapptitle: "Interaktívny dokazovací systém",
    home: "Domov",
    propositional: "Výroková logika",
    firstorder: "Predikátová logika",
    intuitionistic: "Intuicionistická logika",
    methods: "Metódy dokazovania",
    naturalDeduction: "Naturálna dedukcia",
    sequentCalculus: "Gentzenov sekventový kalkul",
    notations: "Notácie",
    tree: "Notácia Gentzen",
    fitch: "Fitch notácia",
    start: "Začať",
    back: "Späť",
    hypos: "Hypotézy",
    formula: "formula",
    term: "term",
    remove: "Vymazať",
    cancel: "Zrušiť",
    use: "Použiť",
    sat: "SAT solver",
    help: "Pomoc",
    getAssignments: "Nájsť ďalšie ohodnotenia",
    downloadPNG: "Stiahnuť transparentné PNG",
    copyLatex: "Kopírovať LaTeX kód",
    remove: "Vyčistiť",
  },
  messages: {
    404: "Oops. Nič tu nie je...",
    goHome: "Domov",
    isProven: "Formula je dokázaná.",
    inputFormula: "Zadaj formulu.",
    formulaIsOK: "Formula je v správnom tvare.",
    formulaIsNotOK: "Formula je v nesprávnom tvare.",
    rule: "Pravidlo ",
    applyed: " aplikované na formulu ",
    applyedFitch: " aplikované.",
    notApplyed: " sa nedá aplikovať na formulu ",
    notApplyedBonding: ", pretože premenná je voľná",
    notApplyedFitch: " sa nedá aplikovať.",
    termIsNotOK: "Nesprávna syntax termu pre substitúciu.",
    termInHyp: "Hypotéza obsahuje vybraný term.",
    nothingToExchange: "Žiadne formuly na výmenu pre pravidlo ",
    block: "Zablokovať",
    unBlock: "Odblokovať",
    blockText: "pole pre fyzickú klávesnicu.",
    sat: "Formula je splniteľná.",
    unsat: "Formula nie je splniteľná.",
    inputDimacs: "DIMACS formát nie je správny.",
    invalidInput: "Nesprávny vstup pre pravidlo ",
    nomore: "Žiadne ďalšie ohodnotenia premenných neboli nájdené.",
    copied: "Dôkaz skopírovaný.",
    aboutPackage: "Podrobnosti o vložení do LaTeX súboru",
    notCopied: "Dôkaz nebol skopírovaný.",
    created: "Obrázok vytvorený.",
    notCreated: "Obrázok nebol vytvorený.",
  },
  home: {
    introText:
      "Táto aplikácia slúži na interaktívne dokazovanie logických formúl. Podporuje výrokovú, intuicionistickú a predikátovú logiku. Formuly dokazuje použitím naturálnej dedukcie alebo sekventového kalkulu. Dôkaz je zobrazený v Gentzen alebo Fitch notácii.",
  },
  logic: {
    negation: "negácia",
    conjunction: "konjunkcia",
    disjunction: "disjunkcia",
    implication: "implikácia",
    universalQuantifier: "všeobecný kvantifikátor",
    existentionalQuantifier: "existenčný kvantifikátor",
    turniket: "turniket",
    verum: "verum",
    absurdum: "absurdum",
    comma: "čiarka",
    leftBracket: "ľavá zátvorka",
    rightBracket: "pravá zátvorka",
    space: "medzera",
    cnf: "CNF",
    dimacs: "DIMACS",
    dimacsVariables: "počet premenných",
    dimacsClauses: "počet klauzúl",
    conclusion: "Záver",
    chooseRows: "Zadaj riadok/riadky",
    badRowFormat: "Nesprávny formát.",
  },
  rules: {
    ndTree: "Pravidlá pre naturálnu dedukciu v notácii Gentzen",
    scTree: "Pravidlá pre sekventový kalkul v notácii Gentzen",
    ndFitch: "Pravidlá pre naturálnu dedukciu vo Fitch notácii",
    chooseLeaf: "Výber listu pre pravidlo",
    chooseFormula: "Výber formuly z listu",
    chooseFormulaFor: "pre pravidlo",
    inputFormula: "Zadaj formulu pre pravidlo",
    inputFormulaFitch: "Zadaj informácie pre pravidlo",
    leaves: "Listy stromu",
    formulaForInput: "Formula pre doplnenie",
    formulasInLeaf: "Formuly listu",
    exchang: "sa vymení s formulou",
    formula: "Formula",
    inputTerm: "Zadaj term pre substitúciu pri pravidle",
    termForInput: "Term pre substitúciu",
    identity: {
      title: "identita",
      label: "identity",
    },
    verum: {
      intro: {
        title: "verum - zavádzajúce",
        label: "zavázdajúce verum",
      },
    },
    absurdum: {
      intro: {
        title: "",
        label: "",
      },
      elimination: {
        title: "absurdum - eliminujúce",
        label: "eliminujúce absurdum",
        label1: "eliminujúce absurdum 1",
        label2: "eliminujúce absurdum 2",
      },
    },
    negation: {
      intro: {
        title: "negácia - zavádzajúce",
        label: "zavázdajúce negáciu",
      },
      elimination: {
        title: "negácia - eliminujúce",
        label: "eliminujúce negáciu",
      },
      left: {
        title: "negácia - ľavá ",
        label: "negácie - ľavé",
      },
      right: {
        title: "negácia - pravá",
        label: "negácie - pravé",
      },
    },
    universalQuantifier: {
      intro: {
        title: "všeobecný kvantifikátor - zavádzajúce",
        label: "zavázdajúce všeobecný kvantifikátor",
      },
      elimination: {
        title: "všeobecný kvantifikátor - eliminujúce",
        label: "eliminujúce všeobecný kvantifikátor",
      },
      left: {
        title: "všeobecný kvantifikátor - ľavá ",
        label: "všeobecný kvantifikátor - ľavé",
      },
      right: {
        title: "všeobecný kvantifikátor - pravá",
        label: "všeobecný kvantifikátor - pravé",
      },
    },
    existentionalQuantifier: {
      intro: {
        title: "existenčný kvantifikátor - zavádzajúce",
        label: "zavázdajúce existenčný kvantifikátor",
      },
      elimination: {
        title: "existenčný kvanitikátor - eliminujúce",
        label: "eliminujúce existenčný kvantifikátor",
      },
      left: {
        title: "existenčný kvantifikátor - ľavá",
        label: "existenčný kvantifikátor - ľavé",
      },
      right: {
        title: "existenčný kvantifikátor - pravá",
        label: "existenčný kvantifikátor - pravé",
      },
    },
    conjunction: {
      intro: {
        title: "konjunkcia - zavádzajúce",
        label: "zavádzajúce konjunkciu",
      },
      elimination: {
        title: "konjunkcia - eliminujúce",
        label1: "eliminujúce konjunkciu 1",
        label2: "eliminujúce konjunkciu 2",
      },
      left: {
        title: "konjunkcia - ľavá",
        label1: "konjunkcie - ľavé 1",
        label2: "konjunkcie - ľavé 2",
      },
      right: {
        title: "konjunkcia - pravá",
        label: "konjunkcie - pravé",
      },
    },
    disjunction: {
      intro: {
        title: "disjunkcia - zavádzajúce",
        label1: "zavádzajúce disjunkciu 1",
        label2: "zavádzajúce disjunkciu 2",
      },
      elimination: {
        title: "disjunkcia - eliminujúce",
        label: "eliminujúce disjunkciu",
      },
      left: {
        title: "disjunkcia - ľavá",
        label: "disjunkcie - ľavé",
      },
      right: {
        title: "disjunkcia - pravá",
        label1: "disjunkcie - pravé 1",
        label2: "disjunkcie - pravé 2",
      },
    },
    implication: {
      intro: {
        title: "implikácia - zavádzajúce",
        label: "zavádzajúce implikáciu",
      },
      elimination: {
        title: "implikácia - eliminujúce",
        label: "eliminujúce implikáciu",
      },
      left: {
        title: "implikácia - ľavá",
        label: "implikácie - ľavé",
      },
      right: {
        title: "implikácia - pravá",
        label: "implikácie - pravé",
      },
    },
    weakening: {
      left: {
        title: "pravidlo zoslabenia - ľavé",
        label: "zoslabenia - ľavé",
      },
      right: {
        title: "pravidlo zoslabenia - pravé",
        label: "zoslabenia - pravé",
      },
    },
    contraction: {
      left: {
        title: "pravidlo kontrakcie - ľavé",
        label: "kontrakcie - ľavé",
      },
      right: {
        title: "pravidlo kontrakcie - pravé",
        label: "kontrakcie - pravé",
      },
    },
    cut: {
      title: "pravidlo rezu",
      label: "rezu",
    },
    exchange: {
      left: {
        title: "pravidlo výmeny - ľavé",
        label: "výmeny - ľavé",
      },
      right: {
        title: "pravidlo výmeny - pravé",
        label: "výmeny - pravé",
      },
    },
    assumption: {
      title: "predpoklad",
      label: "predpoklad",
    },
  },
  help: {
    howto: "Ako na to?",
    title1: "Čo to je?",
    title2: "Podporované logické systémy",
    title3: "Dokazovacie metódy",
    title4: "Notácie dôkazu",
    title5: "Dokazovanie",
    title6: "Zadávanie vstupu",
    title7: "Aplikovanie pravidla",
    title8: "Cookies",
    title9: "Export dôkazu",
    desc1:
      "Webová aplikácia je zameraná na interaktívne dokazovanie logických formúl pomocou postupného výberu a uplatnenia vhodného pravidla. Výber pravidla je čisto na užívateľovi, preto je možné dostať sa do štádia, kedy formula nebude dokázaná a bude nutné vrátiť sa a využiť iné pravidlá.",
    desc2:
      "Aplikácia zobrazuje dôkaz v podobe Gentzen a Fitch notácie. Pri notácii Gentzen je dôkaz reprezentovaný ako strom, kde každý vrchol predstavuje jeden krok dôkazu. Dôkazový strom sa vytvára od koreňa k listom. Notácia gentzen sa používa pri oboch ponúkaných metódach dokazovania. Vo Fitch notácii je dôkaz organizovaný do stĺpcov, pričom každý riadok obsahuje jedno tvrdenie a pravidlo dokazovania, ktoré sa naňho aplikuje. Táto notácia sa používa pri naturálnej dedukcii.",
    desc3:
      "Používateľ môže skúmať rôzne možnosti dokazovacích metód a učiť sa prostredníctvom pokusov a omylov. Aplikácia tiež poskytuje funkcionalitu riešenia problémov splniteľnosti booleovských formúl, umožňujúc overiť, či je daná formula splniteľná.",
    desc4:
      'Aplikácia možňuje rýchlo a presne definovať vaše logické formuly. Na ľavej strane obrazovky sa nachádza vstupné pole a dispozícii je virtuálna klávesnica s logickými symbolmi a písmenami latinskej aj gréckej abecedy, ktorá uľahčuje zadávanie. Klávesnica dokáže premeniť LaTeX kód logických symbolov a písmen gréckej abecedy na vizuálny text. Automatická validácia reťazca sa vykonáva počas zadávania a umožňuje vidieť okamžite, či je formula syntakticky správna. Po zadefinovaní formuly sa stlačením tlačidla "Začať" aktivuje príprava pre dokazovanie a následné zobrazenie formuly v priestore dôkazu.',
    desc5:
      "Na tomto mieste sa nachádza komponent pre zadávanie logickej formuly výrokovej logiky pre metódu gentzenovho sekventového kalkulu.",
    desc6:
      "Proces aplikovania pravidiel umožňuje postupne uplatňovať pravidlá na formuly a týmto spôsobom postupne vyvíjať dôkaz. To umožňuje používateľom interaktívne sledovať proces dôkazovania, experimentovať s rôznymi pravidlami, postupmi a presne kontrolovať kroky dokazovania. Tento prístup tiež uľahčuje učenie sa dokazovania logických formúl prostredníctvom praktického skúmania a experimentovania.",
    desc7:
      'K dispozícii je zoznam pravidiel, ktoré sú špecifické pre zvolený logický systém, metódu dokazovania a notáciu dôkazu. Po výbere konkrétneho pravidla sa pravidlo aplikuje. V prípade, že to pravidlo vyžaduje, zobrazí sa sekcia pre výber listu, výber formúl, zadanie formuly alebo termu a v prípade Fitch notácie zadanie čísel riadkov. V prípade potreby je možné zvrátiť aplikáciu pravidla stlačením tlačidla "Späť".',
    desc8:
      "Po úspešnom dokončení dôkazu sa zobrazí informácia, že formula je dokázaná.",
    desc9:
      "Aplikácie ponúka možnosť riešiť SAT problém, čo je základný problém v oblasti teórie výpočtov a formálnej logiky. Na výber je zadať logickú formulu vo forme konjunktívnej normálnej formy (CNF) alebo vo formáte DIMACS (DIMensional Arrays of Clauses). Na riešenie SAT problému sme implementovali jednoduchý a efektívny algoritmus DPLL (Davis–Putnam–Logemann–Loveland), ktorý využíva unit propagation a pure literal elimination.",
    desc10:
      "Po vyhodnotení algoritmus vráti informáciu o splniteľnosti alebo nesplniteľnosti zadanej formuly.",
    desc11:
      "Aby sme vám umožnili pohodlné pokračovanie v práci naša aplikácia ukladá nasledujúce dáta:",
    desc12:
      "Žiadne údaje spracovávané aplikáciou sa nepoužívajú na identifikáciu používateľov.",
    desc13:
      "Dôkaz je možné exportovať ako PNG súbor s transparentným pozadím. Tento súbor sa automaticky stiahne po kliknutí na tlačidlo ",
    desc14: "Dôkaz je možné skopírovať ako LaTeX kód kliknutím na tlačidlo",
    desc15:
      "Aby sa tento kód zobrazil ako dôkazový strom je potrebné vložiť do projektu balíček ",
    desc16: "Pre Fitch notáciu je potrebné vložiť balíček",
    cookies: {
      lang: "jazyk",
      theme: "téma používateľského rozhrania",
      formula: "vstupné formuly",
      method: "dokazovacie metódy",
      notation: "notácie dôkazov",
      proof: "dôkaz",
      history: "história dôkazu",
      hypo: "hypotézy",
    },
  },
};
