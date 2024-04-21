<template>
  <div class="q-mt-xl">
    <div class="flex column items-start">
      <div
        v-if="props.proof.length > 0"
        v-html="generateProof(props.proof)"
        class="fitch-proof q-pa-xl"
      ></div>

      <div class="q-mt-xl text-body1" v-if="props.conclusion">
        {{ $t("logic.conclusion") }}: {{ props.conclusion }}
      </div>
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
        @click="createLatex(JSON.parse(JSON.stringify(props.proof)))"
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

const props = defineProps(["proof", "conclusion"]);

function generateProof(proof) {
  let html = "";

  html += "<div>";
  for (let index in proof) {
    html += `<div><span class='fitch-index'>${parseInt(index) + 1}</span>`;
    html += "<div class='fitch-spacer'>".repeat(proof[index].depth);
    html += `<div class='fitch-formula ${
      proof[index].rule == "AS" ? "fitch-as" : ""
    }'>${proof[index].formula}</div>`;
    html += "</div>".repeat(proof[index].depth);
    html += "</div>";
  }
  html += "</div>";

  html += "<div>";
  for (let index in proof) {
    html += `<div class='fitch-rule${
      proof[index].rule == "AS" ? "--as" : ""
    }'>${proof[index].rule == "AS" ? "&nbsp;" : proof[index].rule}</div>`;
  }
  html += "</div>";

  return html;
}

function createImage() {
  // change color
  const color = document.querySelector(".fitch-proof").style.color;
  document.querySelector(".fitch-proof").style.color = "#000";

  // create image
  html2canvas(document.querySelector(".fitch-proof"), {
    backgroundColor: "transparent",
  })
    .then((canvas) => {
      document.querySelector(".fitch-proof").style.color = color;

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

async function createLatex(proof) {
  let latexProof = "$\\begin{nd}\n";

  let depth = 0;
  for (let index in proof) {
    // open subproof
    if (proof[index].depth > depth) {
      latexProof += `\\open \n`;
      depth = proof[index].depth;
    }
    // close subproof
    if (proof[index].depth < depth) {
      latexProof += `\\close \n`;
      depth = proof[index].depth;
    }

    // hypothesis and formulas
    if (proof[index].rule == "AS")
      latexProof += `\\hypo{${parseInt(index) + 1}}{${
        proof[index].formula
      }} \n`;
    else
      latexProof += `\\have{${parseInt(index) + 1}}{${
        proof[index].formula
      }} \\by{\${${proof[index].rule}}$}{} \n`;
  }

  latexProof += "\\end{nd}$";

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
