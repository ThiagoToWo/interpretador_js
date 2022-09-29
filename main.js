const form = document.querySelector("form");
const resp = document.querySelector("h3");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const expressão = form.inExpressao.value;

    const posfx = converter.convertToPostfix(expressão);
    const result = evaluater.evaluatePostfixExpression(posfx);

    resp.innerText = result;
});