import{n as C}from"./nearley.3bdbb93f.js";function o(n){return n[0]}var W={Lexer:void 0,ParserRules:[{name:"formula",symbols:[{literal:"\u22A2"},"statement"]},{name:"formula",symbols:["statement",{literal:"\u22A2"},"statement"]},{name:"formula",symbols:["statement",{literal:"\u22A2"}]},{name:"formula",symbols:["statement"],postprocess:o},{name:"statement",symbols:["implication"],postprocess:o},{name:"statement$ebnf$1$subexpression$1",symbols:[{literal:","},"implication"]},{name:"statement$ebnf$1",symbols:["statement$ebnf$1$subexpression$1"]},{name:"statement$ebnf$1$subexpression$2",symbols:[{literal:","},"implication"]},{name:"statement$ebnf$1",symbols:["statement$ebnf$1","statement$ebnf$1$subexpression$2"],postprocess:function(r){return r[0].concat([r[1]])}},{name:"statement",symbols:["implication","statement$ebnf$1"],postprocess:n=>{const r=n[1].map(t=>t.filter(e=>e!=","));return n.pop(),r.forEach(t=>t.length>1?n.push(t):n.push(t[0])),n}},{name:"implication",symbols:["disjunction",{literal:"\u21D2"},"implication"]},{name:"implication",symbols:["disjunction"],postprocess:o},{name:"disjunction",symbols:["conjunction",{literal:"\u2228"},"disjunction"]},{name:"disjunction",symbols:["conjunction"],postprocess:o},{name:"conjunction",symbols:["negation",{literal:"\u2227"},"conjunction"]},{name:"conjunction",symbols:["negation"],postprocess:o},{name:"negation",symbols:[{literal:"\xAC"},"term"]},{name:"negation",symbols:["term"],postprocess:o},{name:"term",symbols:["symbol"],postprocess:o},{name:"term",symbols:[{literal:"("},"statement",{literal:")"}]},{name:"symbol",symbols:[/[α-ωΑ-Ω]/],postprocess:o},{name:"symbol",symbols:[{literal:"\u22A5"}],postprocess:o},{name:"symbol",symbols:[{literal:"\u22A4"}],postprocess:o}],ParserStart:"formula"};const R=[{name:"gsk-tree-id",apply:j},{name:"gsk-tree-nr",apply:D},{name:"gsk-tree-nl",apply:w},{name:"gsk-tree-cr",apply:L},{name:"gsk-tree-cl1",apply:T},{name:"gsk-tree-cl2",apply:v},{name:"gsk-tree-dr1",apply:G},{name:"gsk-tree-dr2",apply:P},{name:"gsk-tree-dl",apply:B},{name:"gsk-tree-ir",apply:K},{name:"gsk-tree-il",apply:V},{name:"gsk-tree-wr",apply:q},{name:"gsk-tree-wl",apply:z},{name:"gsk-tree-cor",apply:H},{name:"gsk-tree-col",apply:J},{name:"gsk-tree-cut",apply:M},{name:"gsk-tree-exr",apply:U},{name:"gsk-tree-exl",apply:Q}];function s(n){if(!Array.isArray(n))return n;n[0]=="("&&n[2]==")"&&(n=n[1]);let r=n.join("");return r=r.replaceAll(",",""),r}function y(n,r){return n[n.length-1]==="\u22A2"?`${n}${r}`:`${n},${r}`}function h(n,r){if(n[0]==="\u22A2")return`${r}${n}`;{let t=n.split("\u22A2");return`${t[0]},${r}\u22A2${t[1]}`}}function f(n){n[0]===","&&(n=n.slice(1));let r=n.indexOf("\u22A2");return n[r-1]===","&&(n=n.slice(0,r-1)+n.slice(r),r--),n[r+1]===","&&(n=n.slice(0,r+1)+n.slice(r+2)),n[n.length-1]===","&&(n=n.slice(0,-1)),n=n.replace(/,,/g,","),n}function p(n){return!(n.includes("\xAC")||n.includes("\u2227")||n.includes("\u2228")||n.includes("\u21D2"))}function j(n,r,t){let e=r[r.indexOf("\u22A2")-1],l=r[r.indexOf("\u22A2")+1];if(e==null||l==null||Array.isArray(e)&&e.some(i=>Array.isArray(i)&&i[0]!="\xAC")||Array.isArray(l)&&l.some(i=>Array.isArray(i)&&i[0]!="\xAC"))return n;e=!p(e)||!Array.isArray(e)?[s(e)]:e.map(s),l=!p(l)||!Array.isArray(l)?[s(l)]:l==null?void 0:l.map(s);const u=n.replace("\u22A2",",").split(",").filter(i=>i!="")[t];return e.includes(u)&&l.includes(u)?[n,[""],"(id)"]:n}function D(n,r,t){let e=r[r.indexOf("\u22A2")+1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\xAC")){e=s(e);let l=n.replace(e,"");return e=e.replace("\xAC",""),l=f(l),[n,[h(l,e)],"(\xACr)"]}else return n}function w(n,r,t){let e=r[r.indexOf("\u22A2")-1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\xAC")){e=s(e);let l=n.replace(e,"");return e=e.replace("\xAC",""),l=f(l),[n,[y(l,e)],"(\xACl)"]}else return n}function L(n,r,t){let e=r[r.indexOf("\u22A2")+1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u2227")){let l=e[0],u=e[2];e=s(e);let i=n.replace(e,"");return i=f(i),[n,[y(i,s(l)),y(i,s(u))],"(\u2227r)"]}else return n}function T(n,r,t){let e=r[r.indexOf("\u22A2")-1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u2227")){let l=e[0];e=s(e);let u=n.replace(e,"");return u=f(u),[n,[h(u,s(l))],"(\u2227l1)"]}else return n}function v(n,r,t){let e=r[r.indexOf("\u22A2")-1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u2227")){let l=e[2];e=s(e);let u=n.replace(e,"");return u=f(u),[n,[h(u,s(l))],"(\u2227l2)"]}else return n}function G(n,r,t){let e=r[r.indexOf("\u22A2")+1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u2228")){let l=e[0];e=s(e);let u=n.replace(e,"");return u=f(u),[n,[y(u,s(l))],"(\u2228r1)"]}else return n}function P(n,r,t){let e=r[r.indexOf("\u22A2")+1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u2228")){let l=e[2];e=s(e);let u=n.replace(e,"");return u=f(u),[n,[y(u,s(l))],"(\u2228r2)"]}else return n}function B(n,r,t){let e=r[r.indexOf("\u22A2")-1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u2228")){let l=e[0],u=e[2];e=s(e);let i=n.replace(e,"");return i=f(i),[n,[h(i,s(l)),h(i,s(u))],"(\u2228l)"]}else return n}function K(n,r,t){let e=r[r.indexOf("\u22A2")+1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u21D2")){let l=e[0],u=e[2];e=s(e);let i=n.replace(e,"");return i=f(i),[n,[h(y(i,s(u)),s(l))],"(\u21D2r)"]}else return n}function V(n,r,t){let e=r[r.indexOf("\u22A2")-1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null&&e.includes("\u21D2")){let l=e[0],u=e[2];e=s(e);let i=n.replace(e,"");return i=f(i),[n,[y(i,s(l)),h(i,s(u))],"(\u21D2l)"]}else return n}function q(n,r,t){let e=r[r.indexOf("\u22A2")+1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null){e=s(e);let l=n.replace(e,"");return l=f(l),[n,[l],"(wr)"]}else return n}function z(n,r,t){let e=r[r.indexOf("\u22A2")-1];if(e===void 0)return n;if(p(e)&&(e=e[t]),e!==null){e=s(e);let l=n.replace(e,"");return l=f(l),[n,[l],"(wl)"]}else return n}function H(n,r,t){let e=r[r.indexOf("\u22A2")+1];return e===void 0?n:(p(e)&&(e=e[t]),e!==null?(e=s(e),[n,[y(n,s(e))],"(cr)"]):n)}function J(n,r,t){let e=r[r.indexOf("\u22A2")-1];return e===void 0?n:(p(e)&&(e=e[t]),e!==null?(e=s(e),[n,[h(n,e)],"(cl)"]):n)}function M(n,r,t,e){return e!==null?[n,[y(n,e),h(n,e)],"(cut)"]:n}function Q(n,r,t,e,l){if(l.first&&l.second){let i=n.split("\u22A2")[0].split(","),a=i.indexOf(l.first),m=i.indexOf(l.second);i[a]=l.second,i[m]=l.first;let $=i.join(",")+n.slice(n.indexOf("\u22A2"));return[n,[$],"(exl)"]}else return n}function U(n,r,t,e,l){if(l.first&&l.second){let i=n.split("\u22A2")[1].split(","),a=i.indexOf(l.first),m=i.indexOf(l.second);i[a]=l.second,i[m]=l.first;let $=n.slice(0,n.indexOf("\u22A2")+1)+i.join(",");return[n,[$],"(exr)"]}else return n}const X=[{name:"nd-tree-vi",apply:Y},{name:"nd-tree-ae1",apply:Z},{name:"nd-tree-ae2",apply:_},{name:"nd-tree-ni",apply:ee},{name:"nd-tree-ne",apply:ne},{name:"nd-tree-ci",apply:te},{name:"nd-tree-ce1",apply:re},{name:"nd-tree-ce2",apply:le},{name:"nd-tree-di1",apply:ie},{name:"nd-tree-di2",apply:ue},{name:"nd-tree-de",apply:se},{name:"nd-tree-ii",apply:ae},{name:"nd-tree-ie",apply:pe}];function c(n){if(!Array.isArray(n))return n;n[0]=="("&&n[2]==")"&&(n=n[1]);let r=n.join("");return r=r.replaceAll(",",""),r}function g(n){return n.length>1?`(${n})`:n}function Y(n,r){return n=="\u22A4"?[n,[],"(\u22A4I)"]:n}function Z(n,r){return[n,["\u22A5"],"(\u22A5E1)"]}function _(n,r){return[n,["\u22A5"],"(\u22A5E2)",[`\xAC${g(n)}`]]}function ee(n,r){return r.includes("\xAC")?[n,["\u22A5"],"(\xACI)",[c(r[1])]]:n}function ne(n,r,t){if(n=="\u22A5"){let e=t.asString,l=`\xAC${g(t.asString)}`;return[n,[e,l],"(\xACE)"]}else return n}function te(n,r){if(r.includes("\u2227")){let t=r[0],e=r[2];return[n,[c(t),c(e)],"(\u2227I)"]}else return n}function re(n,r,t){let e=g(c(r)),l=g(t.asString);return[n,[`${e}\u2227${l}`],"(\u2227E1)"]}function le(n,r,t){let e=g(t.asString),l=g(c(r));return[n,[`${e}\u2227${l}`],"(\u2227E2)"]}function ie(n,r){if(r.includes("\u2228")){let t=r[0];return[n,[c(t)],"(\u2227I1)"]}else return n}function ue(n,r){if(r.includes("\u2228")){let t=r[2];return[n,[c(t)],"(\u2227I1)"]}else return n}function se(n,r,t){return t.asAst.includes("\u2228")?[n,[t.asString,n,n],"(\u2228E)",[c(t.asAst[0]),c(t.asAst[2])]]:n}function ae(n,r){if(r.includes("\u21D2")){let t=r[0],e=r[2];return[n,[c(e)],"(\u21D2I)",[c(t)]]}else return n}function pe(n,r,t){return[n,[t.asString,`${g(t.asString)}\u21D2${g(c(r))}`],"(\u2227E2)"]}const me=[{name:"nd-fitch-as",apply:de},{name:"nd-fitch-ae1",apply:ce},{name:"nd-fitch-ae2",apply:fe},{name:"nd-fitch-ni",apply:oe},{name:"nd-fitch-ne",apply:ye},{name:"nd-fitch-ci",apply:he},{name:"nd-fitch-ce1",apply:$e},{name:"nd-fitch-ce2",apply:ge},{name:"nd-fitch-di1",apply:be},{name:"nd-fitch-di2",apply:Ae},{name:"nd-fitch-de",apply:Ne},{name:"nd-fitch-ii",apply:Ie},{name:"nd-fitch-ie",apply:Se}];function d(n){return n.length>1?`(${n})`:n}function de(n,r,t){return{formula:n,rule:"AS",depth:t.length>0?t[t.length-1].depth+1:1}}function ce(n,r,t){var e;return isNaN(r)||((e=t[r-1])==null?void 0:e.formula)!="\u22A5"?!1:{formula:n,rule:"\u22A5E1, "+r,depth:t[t.length-1].depth}}function fe(n,r,t){var l,u,i,a;let e=r.split("-");return e.some(m=>isNaN(m))||((l=t[e[0]-1])==null?void 0:l.rule)!="AS"||((u=t[e[1]-1])==null?void 0:u.formula)!="\u22A5"||((i=t[e[0]-1])==null?void 0:i.depth)>((a=t[e[1]-1])==null?void 0:a.depth)?!1:{formula:t[e[0]-1].formula.substring(1),rule:"\u22A5E2, "+r,depth:t[e[1]-1].depth-1}}function oe(n,r,t){var l,u,i,a;let e=r.split("-");return e.some(m=>isNaN(m))||((l=t[e[0]-1])==null?void 0:l.rule)!="AS"||((u=t[e[1]-1])==null?void 0:u.formula)!="\u22A5"||((i=t[e[0]-1])==null?void 0:i.depth)>((a=t[e[1]-1])==null?void 0:a.depth)?!1:{formula:`\xAC${d(t[e[0]-1].formula)}`,rule:"\xACI, "+r,depth:0}}function ye(n,r,t){var l,u,i,a;let e=r.split(",");return e.some(m=>isNaN(m))||((l=t[e[0]-1])==null?void 0:l.formula)!=`\xAC${d((u=t[e[1]-1])==null?void 0:u.formula)}`||((i=t[e[0]-1])==null?void 0:i.depth)>((a=t[e[1]-1])==null?void 0:a.depth)?!1:{formula:"\u22A5",rule:"\xACE, "+r,depth:t[t.length-1].depth}}function he(n,r,t){var l,u;let e=r.split(",");return e.some(i=>isNaN(i))||((l=t[e[0]-1])==null?void 0:l.depth)>((u=t[e[1]-1])==null?void 0:u.depth)?!1:{formula:`${d(t[e[0]-1].formula)}\u2227${d(t[e[1]-1].formula)}`,rule:"\u2227I, "+r,depth:t[t.length-1].depth}}function $e(n,r,t){var e;return isNaN(r)||!((e=t[r-1])!=null&&e.formula.includes("\u2227"))?!1:{formula:t[r-1].formula.split("\u2227")[0],rule:"\u2227E1, "+r,depth:t[t.length-1].depth}}function ge(n,r,t){var e;return isNaN(r)||!((e=t[r-1])!=null&&e.formula.includes("\u2227"))?!1:{formula:t[r-1].formula.split("\u2227")[1],rule:"\u2227E2, "+r,depth:t[t.length-1].depth}}function be(n,r,t){var e;return isNaN(r)||!((e=t[r-1])!=null&&e.formula)?!1:{formula:`${d(t[r-1].formula)}\u2228${d(n)}`,rule:"\u2228I1, "+r,depth:t[t.length-1].depth}}function Ae(n,r,t){var e;return isNaN(r)||!((e=t[r-1])!=null&&e.formula)?!1:{formula:`${d(n)}\u2228${d(t[r-1].formula)}`,rule:"\u2228I2, "+r,depth:t[t.length-1].depth}}function Ne(n,r,t){var l,u,i,a,m,$,b,A,N,I,S,E,x,k,O;let e=r.split(",");return e.some(F=>isNaN(F))||((l=t[e[1]-1])==null?void 0:l.rule)!="AS"||((u=t[e[3]-1])==null?void 0:u.rule)!="AS"||((i=t[e[0]-1])==null?void 0:i.formula)!=`${d((a=t[e[1]-1])==null?void 0:a.formula)}\u2228${d((m=t[e[3]-1])==null?void 0:m.formula)}`||(($=t[e[2]])==null?void 0:$.formula)!=((b=t[e[4]])==null?void 0:b.formula)||((A=t[e[1]-1])==null?void 0:A.depth)>((N=t[e[2]-1])==null?void 0:N.depth)||((I=t[e[3]-1])==null?void 0:I.depth)>((S=t[e[4]-1])==null?void 0:S.depth)||((E=t[e[1]-1])==null?void 0:E.depth)!=((x=t[e[3]-1])==null?void 0:x.depth)||((k=t[e[1]-1])==null?void 0:k.depth)-1!=((O=t[e[0]-1])==null?void 0:O.depth)?!1:{formula:t[e[1]].formula,rule:"\u2228E, "+r,depth:t[e[0]-1].depth}}function Ie(n,r,t){var l,u,i;let e=r.split("-");return e.some(a=>isNaN(a))||((l=t[e[0]-1])==null?void 0:l.rule)!="AS"||((u=t[e[0]-1])==null?void 0:u.depth)>((i=t[e[1]-1])==null?void 0:i.depth)?!1:{formula:`${d(t[e[0]-1].formula)}\u21D2${d(t[e[1]-1].formula)}`,rule:"\u21D2I, "+r,depth:t[e[0]-1].depth-1}}function Se(n,r,t){var u,i,a,m;let e=r.split(",");if(e.some($=>isNaN($)))return!1;let l=(u=t[e[0]-1])==null?void 0:u.formula.split("\u21D2");return l[0]!=d((i=t[e[1]-1])==null?void 0:i.formula)||((a=t[e[0]-1])==null?void 0:a.depth)>((m=t[e[1]-1])==null?void 0:m.depth)?!1:{formula:l[1],rule:"\u21D2E, "+r,depth:t[t.length-1].depth}}function xe(n,r){let t;r=="GSK"&&!n.includes("\u22A2")?t="\u22A2"+n:t=n,t=t.replaceAll(" ","");const e=new C.Parser(C.Grammar.fromCompiled(W));try{if(e.feed(t),e.results.length===0)throw new Error("Formula is not valid.");if(r=="ND"&&e.results[0].every(Array.isArray))throw new Error("Formula is not valid.")}catch{return!1}const l=e.results[0];let u=l.indexOf("\u22A2");if((u==0&&l[1][0]=="("||u==1&&l[0][0]=="("||l[0]=="("&&l[2]==")")&&(t=t.replace("(","").replace(/\)(?=[^\)]*$)/,"")),r=="ND"&&t.includes("\u22A2")){if(l[1]=="\u22A2"&&l.length<3)return!1;let[i,a]=t.split("\u22A2");return{hypothesis:i.split(","),formula:a}}return t}function ke(n,r,t,e,l,u){return R.find(i=>i.name==n).apply(r,t,e,l,u)}function Oe(n,r,t,e){return X.find(l=>l.name==n).apply(r,t,e)}function Ce(n,r,t,e){return me.find(l=>l.name==n).apply(r,t,e)}export{ke as a,Oe as b,Ce as c,W as g,xe as v};