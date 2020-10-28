%{
	const { Instruccion } = require("../dist/ast/Instruccion");
	const { AST } = require("../dist/ast/AST");
	const { Asignacion } = require("../dist/ast/instrucciones/Asignacion");
	const { Declaracion } = require("../dist/ast/instrucciones/Declaracion");
	const { Print } = require("../dist/ast/instrucciones/Print");
	const { While } = require("../dist/ast/instrucciones/While");
	const { OperacionAritmetica } = require("../dist/ast/expresiones/OperacionAritmetica");
	const { OperacionLogica } = require("../dist/ast/expresiones/OperacionLogica");
	const { OperacionRelacional } = require("../dist/ast/expresiones/OperacionRelacional");
	const { Identificador } = require("../dist/ast/expresiones/Identificador");
	const { Primitivo } = require("../dist/ast/expresiones/Primitivo");
	const { Type } = require("../dist/ast/Tipo");
	const { TypeOperation } = require("../dist/ast/Tipo");
%}


/* Definició Léxica */
%lex

%options case-insensitive

%%
\s+					//ignorando los espacios en blanco
"//".*				/* ignore comment line */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]		/* ignore comment Multilinea*/

"numeric"			return 'numeric_';
"string"			return 'string_';
"boolean"			return 'boolean_';

"print"				return 'print_';
"while"				return 'while_';
"if"				return 'if_';
"else"				return 'else_';

"="					return 'igual';
";"					return 'pcoma';
"{"					return 'llaveAbre';
"}"					return 'llaveCierra';

"+"					return 'mas';
"-"					return 'menos';
"*"					return 'por';
"/"					return 'division';
"("					return 'parAbre';
")"					return 'parCierra';

"<"					return 'menorQ';
">"					return 'mayorQ';

"&&"				return 'and_';
"||"				return 'or_';
"!"					return 'not_';

"true"				return 'true_';
"false"				return 'false_';

\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; /*//"*/ }

[0-9]+"."[0-9]+		return 'decimal';

([a-zA-Z_])[a-zA-Z0-9_]*		return 'identificador';
[ \r\t]+			{}
\n					{}
<<EOF>>				return 'EOF';
.	{ 
		console.error('Error léxico: ' + yytext + ', line: ' + yylloc.first_line + ', column: ' + yylloc.first_column); 
	}

/lex

%left 'or_'
%left 'and_'
%left 'mayorQ' 'menorQ'

%left 'mas' 'menos'
%left 'por' 'division'

%left uMenos
%right 'not_'



%start INI

%% 
INI : INSTRUCCIONES EOF {
		var root = new AST($1);
		return root; 
	}
	;

INSTRUCCIONES :
	  INSTRUCCIONES INSTRUCCION {
		$1.push($2);
		$$ = $1;
	  }
	| INSTRUCCION {
		$$ = [$1];
	}
	;

INSTRUCCION : 
	  DECLARACION 	{ $$ = $1; }
	| ASIGNACION	{ $$ = $1; }
	| WHILE			{ $$ = $1; }
	| PRINT			{ $$ = $1; }
	;

DECLARACION : TIPO identificador igual EXPRESION pcoma { $$= new Declaracion($1, $2, $4, this._$.first_line, this._$.first_column); }
	;

TIPO : numeric_ { $$ = Type.NUMERIC; }
	| string_ 	{ $$ = Type.STRING; }
	| boolean_	{ $$ = Type.BOOLEAN; }
	;

ASIGNACION : identificador igual EXPRESION pcoma { $$ = new Asignacion($1, $3, this._$.first_line, this._$.first_column); }
	;

WHILE : while_ CONDICION BLOQUE_SENTENCIAS { $$ = new While($2, $3, this._$.first_line, this._$.first_column); }
	;

CONDICION : parAbre EXPRESION parCierra { $$ = $2; }
	;

BLOQUE_SENTENCIAS : llaveAbre INSTRUCCIONES llaveCierra { $$ = $2; }
	;

PRINT : print_ CONDICION pcoma { $$ = new Print( $2, this._$.first_line, this._$.first_column); }
	;

EXPRESION : 
	// Aritmeticas
	  EXPRESION mas EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.SUMA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menos EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.RESTA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION por EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.MULTIPLICACION, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION division EXPRESION	{ $$ = new OperacionAritmetica( TypeOperation.DIVISION, $1, $3, this._$.first_line, this._$.first_column); }
	// Relacionales
	| EXPRESION mayorQ EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MAYOR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menorQ EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MENOR, $1, $3, this._$.first_line, this._$.first_column); }
	// Logicas
	| EXPRESION or_ EXPRESION		{ $$ = new OperacionLogica( TypeOperation.OR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION and_ EXPRESION		{ $$ = new OperacionLogica( TypeOperation.AND, $1, $3, this._$.first_line, this._$.first_column); }
	| not_ EXPRESION				{ $$ = new OperacionLogica( TypeOperation.NOT, $2, null, this._$.first_line, this._$.first_column); }
	| menos EXP %prec uMenos		{ $$ = new OperacionAritmetica( TypeOperation.MENOSUNARIO, $2, null, this._$.first_line, this._$.first_column); }
	| parAbre EXPRESION parCierra	{ $$ = $2; }
	| PRIMITIVO						{ $$ = $1; }
	;

PRIMITIVO : 
	  decimal		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| cadena		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| true_			{ $$ = new Primitivo( true, this._$.first_line, this._$.first_column); }
	| false_		{ $$ = new Primitivo( false, this._$.first_line, this._$.first_column); }
	| identificador { $$ = new Identificador( $1, this._$.first_line, this._$.first_column); }
	;
