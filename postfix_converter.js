/*
CONVERSOR INFIX - POSTFIX

Converte uma expressão aritmética infixa comum (suponha que uma expressão válida é inserida)
com inteiros de único dígito como
	(6 + 2) * 5 - 8 / 4
para uma expressão pós-fixa. A versão pós-fixa da expressão infixa precedente é
	6 2 + 5 * 8 4 / -

O algoritmo é como abaixo.

1) Insira um parêntese esquerdo ‘(‘ na pilha.
2) Acrescente um parêntese direito ‘)’ ao final de infix.
3) Enquanto a pilha não estiver vazia, leia infix da esquerda para a direita e faça o seguinte:
	Se o caractere atual no infix for um dígito, copie-o para o próximo elemento de postfix.
	Se o caractere atual em infix for um parêntese esquerdo, adicione-o à pilha.
	Se o caractere atual no infix for um operador,
		Remova os operadores (se houver algum) a partir da parte superior da pilha, embora 
		eles tenham precedência igual ou maior que a do operador atual e insira os operadores
		removidos em postfix. 
		Adicione o caractere atual a infix na pilha.
	Se o caractere atual no infix for um parêntese direito,
		Remova os operadores a partir da parte superior da pilha e os insira em postfix até
		que um parêntese esquerdo esteja na parte superior da pilha.
		Remova (e descarte) o parêntese esquerdo da pilha.

As seguintes operações aritméticas são permitidas em uma expressão:
	+ adição
	- subtração
	* multiplicação
	/ divisão
	^ exponenciação
	% módulo

Exemplo: (6 + 2) * 5 - 8 / 4

(6 + 2) * 5 - 8 / 4)

infix			stack		postfix
				(
(				((
(6				((			6
(6+				((+			6
(6+2			((+			62
(6+2)			(			62+
(6+2)*			(*			62+
(6+2)*5			(*			62+5
(6+2)*5-		(-			62+5*
(6+2)*5-8		(-			62+5*8
(6+2)*5-8/		(-/			62+5*8
(6+2)*5-8/4		(-/			62+5*84
(6+2)*5-8/4)				62+5*84/-

62+5*84/-
*/

const converter = (function() {
	var tos = -1; // topo da pilha
	var ifx_pos = 0; // posição de leitura atual da infix
	var stack = new Array(100);

	//converte a expressão infixa em notação pós-fixa.
	function convertToPostfix(infix) {
		var len = infix.length;
		var postfix = "";
		var c = '';
		
		// Insira um parêntese esquerdo ‘(‘ na pilha.
		stack[++tos] = '(';
		
		// Acrescente um parêntese direito ‘)’ ao final de infix.
		infix += ')';
		
		// Enquanto a pilha não estiver vazia, leia infix da esquerda para a direita e faça o seguinte:
		while(tos > -1) {
			while (infix[ifx_pos] == " ") ifx_pos++; // ignora espaço em branco
			
			c = infix[ifx_pos];		
			
			switch (c) {
				case '(': // Se o caractere atual em infix for um parêntese esquerdo, adicione-o à pilha.
					stack[++tos] = c; 
					break;			
				case '^': // Se o caractere atual no infix for um operador...
					
					/*Remova os operadores (se houver algum) a partir da parte superior da pilha, 
					se eles tenham precedência igual ou maior que a do operador atual e insira os 
					operadores removidos em postfix.*/
					while (stack[tos] != '*' && stack[tos] != '/' 
						&& stack[tos] != '+' && stack[tos] != '-' 
						&& stack[tos] != '(') {
						postfix += stack[tos--];
					}
					
					// Adicione o caractere atual da infix na pilha.
					stack[++tos] = c;
					break;
				case '*':
				case '/':
					
					/*Remova os operadores (se houver algum) a partir da parte superior da pilha, 
					se eles tenham precedência igual ou maior que a do operador atual e insira os 
					operadores removidos em postfix.*/
					while (stack[tos] != '+' && stack[tos] != '-' 
						&& stack[tos] != '(') {
						postfix += stack[tos--];
					}
					
					// Adicione o caractere atual da infix na pilha.
					stack[++tos] = c;
					break;
				case '+':
				case '-':
					
					/*Remova os operadores (se houver algum) a partir da parte superior da pilha, 
					se eles tenham precedência igual ou maior que a do operador atual e insira os 
					operadores removidos em postfix.*/
					while (stack[tos] != '(') {
						postfix += stack[tos--];
					}
					
					// Adicione o caractere atual da infix na pilha.
					stack[++tos] = c;
					break;
				case ')': // Se o caractere atual no infix for um parêntese direito,
				
					/*Remova os operadores a partir da parte superior da pilha e os insira em 
					postfix até que um parêntese esquerdo esteja na	parte superior da pilha.*/
					while (tos > -1 && stack[tos] != '(') {
						postfix += stack[tos--];
					}
				
					// Remova (e descarte) o parêntese esquerdo da pilha.
					tos--;
					break;
				default: // Se o caractere atual no infix for um dígito, copie-o para o próximo elemento de postfix.
					postfix += c;
			}
			ifx_pos++
		}
		
		tos = -1;
		ifx_pos = 0;
		return postfix;
	}
	
	return {convertToPostfix: convertToPostfix};
})();