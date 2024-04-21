<template>
  <div>
    <div class="q-my-md flex items-center overflow-auto scroll toimage">
      <div
        v-html="generateTree(props.proof)"
        v-if="props.proof.length > 0"
        class="tree q-mx-auto q-pa-xl"
      ></div>
    </div>

    <div
      v-if="props.proof.length > 0"
      class="flex justify-end q-mx-xl q-gutter-sm"
    >
      <q-btn
        icon="download"
        color="primary"
        outline
        size="md"
        padding="xs"
        @click="createImage()"
      >
        <q-tooltip :delay="500">{{ $t("labels.downloadPNG") }}</q-tooltip>
      </q-btn>
      <q-btn
        icon="code"
        color="primary"
        outline
        size="md"
        padding="xs"
        @click="createLatex()"
      >
        <q-tooltip :delay="500">{{ $t("labels.copyLatex") }}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import i18n from "src/i18n";
import html2canvas from "html2canvas";

const props = defineProps(["proof"]);

function generateTree(node) {
  // as proof
  if (node.length > 1) {
    let html = "";

    // more
    if (node[1].length > 1) {
      html += "<div class='tree__siblings'>";
      node[1].forEach((item) => {
        html += `<div>${generateTree(item)}</div>`;
      });
      html += "</div>";
      // just one
    } else {
      html += generateTree(node[1][0]);
    }
    let rule = node[2].endsWith(")") ? node[2] : getSmallHypo(node[2], ")");

    html += `<div class='tree__border-top'><span>${node[0]}</span><span class='tree__border-top__rule'>${rule}</span></div>`;

    return html;
    // as leaf
  } else {
    let formula = node.length == 0 ? "" : node[0];
    return `<div>${
      formula.includes("]") ? getSmallHypo(formula, "]") : formula
    }</div>`;
  }
}

function getSmallHypo(node, splitter) {
  let splited = node.split(splitter);

  return `${splited[0]}${splitter}<span class="tree__hypo">${splited[1]}</span>`;
}

function createImage() {
  // change color
  const color = document.querySelector(".tree").style.color;
  document.querySelector(".tree").style.color = "#000";

  // create image
  html2canvas(document.querySelector(".tree"), {
    backgroundColor: "transparent",
  })
    .then((canvas) => {
      document.querySelector(".tree").style.color = color;

      // create link to download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "proof.png";
      link.click();

      Notify.create({
        type: "positive",
        message: i18n.global.t("messages.created"),
      });
    })
    .catch((error) => {
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.notCreated"),
      });
    });
}

async function createLatex() {
  // create latex
  let latexProof = `\\begin{prooftree}\n${arrayToLatex(
    JSON.parse(JSON.stringify(props.proof))
  )}\\end{prooftree}`;

  // replace symbols with latex code
  for (const symbol in latexSymbols) {
    latexProof = latexProof.replaceAll(symbol, latexSymbols[symbol] + " ");
  }

  // copy
  try {
    await navigator.clipboard.writeText(latexProof);
    Notify.create({
      type: "positive",
      message: i18n.global.t("messages.copied"),
      multiLine: true,
      actions: [
        {
          label: i18n.global.t("messages.aboutPackage"),
          color: "white",
          handler: () => {
            window.open("#/help#export", "_blank");
          },
        },
      ],
    });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: i18n.global.t("messages.notCopied"),
    });
  }
}

function arrayToLatex(node) {
  if (node.length > 1) {
    let latex = "";
    // more
    if (node[1].length > 1) {
      node[1].reverse().forEach((item) => {
        latex += `${arrayToLatex(item)}`;
      });
      // just one
    } else {
      latex += arrayToLatex(node[1][0]);
    }
    let number = node[1].length;
    latex += `\\infer${number}[\${${node[2]}}$]{${node[0]}}\n`;

    return latex;
  } else {
    let formula = node.length == 0 ? "" : node[0];
    return `\\hypo{${formula}}\n`;
  }
}

const latexSymbols = {
  "∧": "\\land",
  "∨": "\\lor",
  "¬": "\\neg",
  "⇒": "\\Rightarrow",
  "∀": "\\forall",
  "∃": "\\exists",
  "⊤": "\\top",
  "⊥": "\\bot",
  "⊢": "\\vdash",
  α: "\\alpha",
  β: "\\beta",
  γ: "\\gamma",
  δ: "\\delta",
  ε: "\\epsilon",
  ζ: "\\zeta",
  η: "\\eta",
  θ: "\\theta",
  ι: "\\iota",
  κ: "\\kappa",
  λ: "\\lambda",
  μ: "\\mu",
  ν: "\\nu",
  ξ: "\\xi",
  ο: "\\omicron",
  π: "\\pi",
  ρ: "\\rho",
  σ: "\\sigma",
  τ: "\\tau",
  υ: "\\upsilon",
  φ: "\\phi",
  χ: "\\chi",
  ψ: "\\psi",
  ω: "\\omega",
};
</script>
