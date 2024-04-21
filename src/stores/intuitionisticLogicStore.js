import { defineStore } from "pinia";
import { Cookies } from "quasar";
/**
 * methods:
 *    ND  - natural deduction,
 *    GSC - gentzen sequent calculus
 * notations:
 *    tree
 *    fitch
 */

export const ILStore = defineStore("intuitionisticLogicStore", {
  state: () => ({
    currentMethod: "GSK",
    currentNotation: "tree",

    inputFormula: "",
    proof: [],
    history: [],

    // tree variables
    leaves: [],
    sameLeaves: {
      exists: false,
      applied: false,
    },

    // fitch variables
    fitchProving: false,
    conclusion: null,

    // natural deduction
    hypotesis: [],
  }),
  getters: {
    // getters for method
    getMethod: (state) => state.currentMethod,
    getNotation: (state) => state.currentNotation,
    // getters for input formula
    getInputFormula: (state) => state.inputFormula,
    getProof: (state) => state.proof,
    // getters for status
    isProving: (state) => {
      if (state.currentNotation == "tree") return state.leaves.length > 0;
      else return state.fitchProving;
    },
    // chceck if proven by leaves or hypotesis
    isProven: (state) => {
      if (state.getMethod.value == "GSK")
        return state.leaves.length == 0 && state.proof.length > 0;
      else if (state.currentNotation == "tree") {
        return (
          state.hypotesis?.every((hypo) => hypo.used == true) &&
          state.leaves.length == 0 &&
          state.proof.length > 0
        );
      } else {
        return (
          state.proof[state.proof.length - 1]?.formula == state.inputFormula
        );
      }
    },
    // tree variables
    getLeaves: (state) => state.leaves,
    // natural deduction
    getHypotesis: (state) => state.hypotesis,
    // fitch
    getConclusion: (state) => state.conclusion,
  },
  actions: {
    setFromCookies() {
      Cookies.has("il-formula") &&
        this.setInputFormula(Cookies.get("il-formula"));

      Cookies.has("il-leaves") && this.setLeaves(Cookies.get("il-leaves"));

      Cookies.has("il-proof") && (this.proof = Cookies.get("il-proof"));

      Cookies.has("il-history") && this.setHistory(Cookies.get("il-history"));

      Cookies.has("il-hypo") && (this.hypotesis = Cookies.get("il-hypo"));

      Cookies.has("il-method")
        ? (this.currentMethod = Cookies.get("il-method"))
        : Cookies.set("il-method", this.currentMethod);

      Cookies.has("il-notation")
        ? (this.currentNotation = Cookies.get("il-notation"))
        : Cookies.set("il-notation", this.currentNotation);

      if (Cookies.has("il-fitch")) {
        this.conclusion = Cookies.get("il-fitch");
        this.fitchProving = true;
      }
    },
    setMethod(method) {
      this.currentMethod = method;
      this.clearTree();
      Cookies.set("il-method", this.currentMethod);
    },
    setNotation(notation) {
      this.currentNotation = notation;
      this.clearTree();
      Cookies.set("il-notation", this.currentNotation);
    },
    setInputFormula(formula) {
      this.inputFormula = formula;
    },
    setFitchProoving() {
      this.fitchProving = true;
      this.conclusion = this.inputFormula.includes("⊢")
        ? this.inputFormula.split("⊢")[1]
        : this.inputFormula;
    },
    setProof(proof) {
      this.proof = [proof];
    },
    setLeaves(leaves) {
      this.leaves = leaves;
    },
    setSameLeaves(isThere) {
      this.sameLeaves.exists = isThere;
    },
    resetSameLeaves() {
      this.sameLeaves.exists = false;
      this.sameLeaves.applied = false;
    },
    setHistory(history) {
      this.history = history;
    },
    pushLeaf(leaf) {
      this.leaves.push(leaf);
    },
    spliceLeaves(leaf) {
      this.leaves.splice(this.leaves.indexOf(leaf), 1);
    },
    popLeaf() {
      return this.leaves.pop();
    },
    clearTree() {
      this.proof = [];
      Cookies.remove("il-proof");
      this.leaves = [];
      Cookies.remove("il-leaves");
      this.history = [];
      Cookies.remove("il-history");
      this.hypotesis = [];
      Cookies.remove("il-hypo");
      this.fitchProving = false;
      this.conclusion = null;
      Cookies.remove("il-fitch");
    },
    addFormulaToProof(proof, result) {
      // as proof
      if (proof.length > 1) {
        // as two proofs
        if (proof[1].length > 1)
          proof[1].forEach((item) => this.addFormulaToProof(item, result));
        // as one proof
        else this.addFormulaToProof(proof[1][0], result);
      }
      // as leaf
      else {
        if (proof[0] === result[0]) {
          if (this.sameLeaves.exists && !this.sameLeaves.applied) {
            this.sameLeaves.applied = true;
            return;
          }
          proof[1] = [];
          result[1].forEach((item) => {
            if (
              this.currentMethod == "ND" &&
              this.hypotesis.some((hypo) => hypo.hypo == item)
            ) {
              let index = this.hypotesis.findIndex((hypo) => hypo.hypo == item);
              const isApplicable = this.findLeaf(
                this.history[this.history.length - 1].proof,
                proof[0],
                String.fromCharCode("a".charCodeAt(0) + index),
                []
              );

              if (isApplicable || result[3]?.includes(item))
                proof[1].push([
                  `[${item}]${String.fromCharCode("a".charCodeAt(0) + index)}`,
                ]);
              else proof[1].push(item);
            } else {
              proof[1].push([item]);
            }
          });
          proof.push(result[2]);
        }
      }
    },
    addRowToProof(row) {
      this.proof.push(row);
    },
    addToHistory() {
      if (this.currentNotation == "tree") {
        this.history.push({
          proof: JSON.parse(JSON.stringify(this.proof)),
          leaves: JSON.parse(JSON.stringify(this.leaves)),
          hypotesis: JSON.parse(JSON.stringify(this.hypotesis)),
        });
      } else {
        this.history.push({
          proof: JSON.parse(JSON.stringify(this.proof)),
        });
      }

      Cookies.set("il-history", this.history);
    },
    retrieveFromHistory() {
      const last = this.history.pop();

      this.proof = last.proof;
      this.leaves = last?.leaves;
      this.hypotesis = last?.hypotesis;

      Cookies.set("il-proof", this.proof);
      Cookies.set("il-leaves", this.leaves);
      Cookies.set("il-hypo", this.hypotesis);
      Cookies.set("il-history", this.history);
    },
    addHypotesis(hypotesis) {
      hypotesis.forEach((item) => {
        if (!this.hypotesis.includes(item))
          this.hypotesis.push({ hypo: item, used: false });
      });
    },
    // check if formula is hypothesis
    checkHypotesis(formula, leaf) {
      if (this.hypotesis.some((hypo) => hypo.hypo == formula)) {
        let index = this.hypotesis.findIndex((hypo) => hypo.hypo == formula);
        const isApplicable = this.findLeaf(
          this.proof,
          leaf,
          String.fromCharCode("a".charCodeAt(0) + index),
          []
        );

        this.hypotesis = this.hypotesis.map((item) =>
          item.hypo == formula && isApplicable
            ? { hypo: item.hypo, used: true }
            : item
        );
        return isApplicable;
      }
      return false;
    },
    findLeaf(proof, leaf, hypo, hypos) {
      if (proof?.length > 1) {
        if (proof[2] && !proof[2].endsWith(")")) hypos.push(proof[2].slice(-1));

        // as two proofs
        if (proof[1].length > 1) {
          for (const item of proof[1]) {
            if (
              this.findLeaf(item, leaf, hypo, JSON.parse(JSON.stringify(hypos)))
            )
              return true;
          }
        }
        // as one proof
        else
          return this.findLeaf(
            proof[1][0],
            leaf,
            hypo,
            JSON.parse(JSON.stringify(hypos))
          );
      } else {
        if (proof && proof[0] == leaf) return hypos.includes(hypo);
        else return false;
      }

      return false;
    },
  },
});
