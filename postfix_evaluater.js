/*
AVALIADOR POSTFIX

Avalia uma expressão pós-fixa (pressuponha que ela seja válida) como
	6 2 + 5 * 8 4 / -
O algoritmo é como segue:
1) Acrescente o caractere nulo (‘\0’) ao fim da expressão pós-fixa. 
   Quando o caractere nulo é encontrado, não é necessário mais nenhum processamento.
2) Enquanto ‘\0’ não foi encontrado, leia a expressão da esquerda para a direita.
	Se o caractere atual for um dígito,
		Insira seu valor inteiro na pilha (o valor de inteiro de um caractere de dígito
		é seu valor no conjunto de caracteres do computador menos o valor de ‘0’ no 
		conjunto de caracteres do computador).
	Caso contrário, se o caractere atual for um operador,
		Remova os dois elementos superiores da pilha para variáveis x e y.
		Calcule y operador x.
		Adicione o resultado do cálculo à pilha.
3) Quando o caractere nulo for encontrado na expressão, remova o valor superior da pilha. 
   Esse é o resultado da expressão pós-fixa.

As operações aritméticas permitidas em uma expressão são
	+ adição
	– subtração
	* multiplicação
	/ divisão
	^ exponenciação
	% módulo
	
Exemplo: 6 2 + 5 * 8 4 / -

6 2 + 5 * 8 4 / -\0

postfix				stack				value
6				6
62				6, 2
62+				8 (= 6 + 2)
62+5				8,5
62+5*				40 (= 8 * 5)
62+5*8				40, 8
62+5*84				40, 8, 4
62+5*84/			40, 2 (= 8 / 4)
62+5*84/-			38 (= 40 - 2)		
62+5*84/-\0							38

6 2 + 5 * 8 4 / - <=> (6 + 2) * 5 - 8 / 4 = 38
*/

const evaluater = (function(){
	var tos = -1; // topo da pilha
	var pfx_pos = 0; // posição de leitura atual da postfix
	var stack = new Array(100);

	function evaluatePostfixExpression(postfix) {
		var x = 0;
		var y = 0;
		var value = 0;
		var c = '';
		
		// Acrescente o caractere nulo (‘\0’) ao fim da expressão pós-fixa.
		postfix += '\0';		
		
		// Enquanto ‘\0’ não foi encontrado, leia a expressão da esquerda para a direita.
		while (postfix[pfx_pos] != '\0') {
			while (postfix[pfx_pos] == ' ') pfx_pos++ // ignora espaços em branco
			
			c = postfix[pfx_pos];
			
			if (!isOperator(c)) { // Se o caractere atual for um dígito,
				
				// Insira seu valor inteiro na pilha (o valor de inteiro de um caractere de dígito
				stack[++tos] = Number(c);
			} else { // Caso contrário, se o caractere atual for um operador,
				
				// Remova os dois elementos superiores da pilha para variáveis x e y.
				x = stack[tos--];
				y = stack[tos--];
				
				/*Calcule y operador x.
				Adicione o resultado do cálculo à pilha.*/
				switch(c) {
					case '+': stack[++tos] = y + x; break;
					case '-': stack[++tos] = y - x; break;
					case '*': stack[++tos] = y * x; break;
					case '/': stack[++tos] = y / x; break;
					case '^': stack[++tos] = y ** x; break;
					case '%': stack[++tos] = y % x; break;
				}
			}			
			pfx_pos++;
		}		
		
		
		
		/*Quando o caractere nulo for encontrado na expressão, remova o valor superior da pilha. 
		Esse é o resultado da expressão pós-fixa.*/		
		value = stack[tos--]; 
		tos = -1
		pfx_pos = 0;
		return value
	}

	function isOperator(c) {
		return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^' || c == '%');
	}
	
	return {evaluatePostfixExpression: evaluatePostfixExpression};
})();
