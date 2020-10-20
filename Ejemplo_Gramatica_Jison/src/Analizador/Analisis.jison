
/* Definició Léxica */
%lex

%options case-insensitive

%%

"class"				return 'class_';
"print"				return 'print_';
"if"				return 'if_';
"int"				return 'int_r';
"double"			return 'double_r';
"void"				return 'void_';
";"					return 'pcoma';
"("					return 'parizq';
")"					return 'parder';
"{"					return 'llaveizq';
"}"					return 'llaveder';
"="					return 'igual';

"+"					return 'mas';
"-"					return 'menos';
"*"					return 'POR';
"/"					return 'DIVIDIDO';


/* Espacios en blanco */
[ \r\t]+			{}
\n					{}

([a-zA-Z_])[a-zA-Z0-9_]*		return 'identificador';
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';

<<EOF>>				return 'EOF';

.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex



/* Asociación de operadores y precedencia */

%left 'mas' 'menos'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini : LISTA_CLASES EOF {
        return $1;
    }
;

LISTA_CLASES : LISTA_CLASES CLASE
	| CLASE
	| error llaveder { 
		console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno + 1) + ', en la columna: ' + this._$.first_column); 
	}
	|error pcoma { 
		
		console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno + 1) + ', en la columna: ' + this._$.first_column); 
	}
	;

CLASE : class_ identificador llaveizq LISTA_INSTRUCCION_GLOBAL llaveder
	| class_ identificador llaveizq llaveder
	;

LISTA_INSTRUCCION_GLOBAL : LISTA_INSTRUCCION_GLOBAL INSTRUCCION_GLOBAL
	| INSTRUCCION_GLOBAL
	;

INSTRUCCION_GLOBAL : DECLARACION
	| FUNCIONES
	;


DECLARACION : TIPO identificador pcoma
	| TIPO identificador igual EXPRESION pcoma
	;

TIPO : int_r
	| double_r
	;

BLOQUE_SENTENCIAS : llaveizq LISTA_SENTECIAS llaveder	{ $$ = $1; }
	| llaveizq llaveder { $$ = []; }
	;

FUNCIONES: TIPO identificador parizq parder BLOQUE_SENTENCIAS
	| void_ identificador parizq parder BLOQUE_SENTENCIAS
	;

LISTA_SENTECIAS : LISTA_SENTECIAS SENTENCIAS
	| SENTENCIAS
	|error pcoma { 
		console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno + 1) + ', en la columna: ' + this._$.first_column); 
	}
	;

SENTENCIAS : DECLARACION
	| ASIGNACION
	| IF
	| PRINT
	;

ASIGNACION : identificador igual EXPRESION pcoma
	;

IF : if_ parizq EXPRESION parder BLOQUE_SENTENCIAS
	;

PRINT : print_ parizq EXPRESION parder pcoma
	;




/* 
class id{}
*/









EXPRESION
	: menos EXPRESION %prec UMENOS { $$ = $2 *-1; }
	| EXPRESION mas EXPRESION		{ $$ = $1 + $3; }
	| EXPRESION menos EXPRESION		{ $$ = $1 - $3; }
	| EXPRESION POR EXPRESION		{ $$ = $1 * $3; }
	| EXPRESION DIVIDIDO EXPRESION	{ $$ = $1 / $3; }
	| ENTERO						{ $$ = Number($1); }
	| DECIMAL						{ $$ = Number($1); }
	| PARIZQ EXPRESION PARDER		{ $$ = $2; }
;