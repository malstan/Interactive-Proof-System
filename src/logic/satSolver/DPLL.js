/**
 * DPLL algorithm
 */
export function DPLL(clauses, assignment) {
  let [clausesAfterUP, assignmentAfterUP] = unitPropagation(
    clauses,
    assignment
  );

  if (clausesAfterUP.length == 0) return assignment;
  if (clausesAfterUP.some((clause) => clause.length == 0)) return "UNSAT";

  let [clausesAfterPLE, assignmentAfterPLE] = pureLiteralElimination(
    clausesAfterUP,
    assignmentAfterUP
  );

  if (clausesAfterPLE.length == 0) return assignment;
  if (clausesAfterPLE.some((clause) => clause.length == 0)) return "UNSAT";

  const literals = [...new Set(clausesAfterPLE.join(",").split(","))];

  let literal = literals[0].replace("¬", "");

  let result = DPLL([...clausesAfterPLE, [literal]], assignmentAfterPLE);

  if (result != "UNSAT") {
    result[literal] = true;
    return result;
  }

  result = DPLL([...clausesAfterPLE, ["¬" + literal]], assignmentAfterPLE);

  if (result != "UNSAT") {
    result[literal] = false;
    return result;
  }

  return "UNSAT";
}

/**
 * unit propagation algorithm
 */
const unitPropagation = (clauses, assignment) => {
  let literal = "";
  for (const clause of clauses) {
    if (clause.length == 1 && !(clause[0].replace("¬", "") in assignment)) {
      literal = clause[0];
      break;
    }
  }
  if (literal != "") {
    // assign
    assignment[literal.replace("¬", "")] = literal.includes("¬") ? false : true;

    literal = literal.replace("¬", "");
    // remove
    if (assignment[literal]) {
      clauses = clauses.filter((clause) => !clause.includes(literal));
      clauses.forEach((clause) => {
        if (clause.includes("¬" + literal)) {
          clause.splice(clause.indexOf("¬" + literal), 1);
        }
      });
    } else {
      clauses = clauses.filter((clause) => !clause.includes("¬" + literal));
      clauses.forEach((clause) => {
        if (clause.includes(literal)) {
          clause.splice(clause.indexOf(literal), 1);
        }
      });
    }
  }
  return [clauses, assignment];
};

/**
 * pure literal elimination algorithm
 */
const pureLiteralElimination = (clauses, assignment) => {
  let pureLiteral = "";
  const literals = new Set(clauses.join(",").split(","));

  literals.forEach((literal) => {
    let temp = literal.replace("¬", "");
    if (
      clauses.some((clausule) => clausule.includes(temp)) !=
      clauses.some((clausule) => clausule.includes("¬" + temp))
    ) {
      pureLiteral = literal;
      return;
    }
  });

  if (pureLiteral != "") {
    assignment[pureLiteral.replace("¬", "")] = pureLiteral.includes("¬")
      ? false
      : true;

    clauses = clauses.filter((clause) => !clause.includes(pureLiteral));
  }

  return [clauses, assignment];
};

export function dimacsToCnf(dimacs) {
  let body = dimacs.split("\n");

  // prepare head
  let head = body[0].split(" ");
  if (head.length != 4) return { status: false };

  const variables = parseInt(head[2]);
  const clauses = parseInt(head[3]);

  // check head
  if (!Number.isInteger(variables) || !Number.isInteger(clauses))
    return { status: false };

  // prepare body
  body.shift();
  if (body.length != clauses) return { status: false };

  for (const key in body) {
    body[key] = body[key].replaceAll("-", "¬");

    body[key] = body[key].split(" ");
    // check end
    if (body[key][body[key].length - 1] != 0) return { status: false };

    body[key].pop();
    // check length
    if (body[key].length > variables) return { status: false };
  }

  if (
    [
      ...body.reduce(
        (set, clause) =>
          new Set([
            ...set,
            ...clause.map((literal) => literal.replace("¬", "")),
          ]),
        new Set()
      ),
    ].length != variables
  )
    return { status: false };

  return {
    status: true,
    formula: body,
  };
}
