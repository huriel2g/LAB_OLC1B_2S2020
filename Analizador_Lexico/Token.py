from enum import Enum


class Tipo(Enum):
    # Simbolos del Lenguaje
    LLAVEIZQ = 1
    LLAVEDER = 2
    DPUNTOS = 3
    PCOMA = 4
    COMA = 5

    # Palabras reservadas
    COLOR = 6
    FSIZE = 7
    POS = 8
    TOP = 9
    BACK_COLOR = 10
    MARGIN_TOP = 11

    # Expresiones Regulares
    VALOR = 12
    ID = 13
    NINGUNO = 14


class Token:
    tipoToken = Tipo.NINGUNO
    valorToken = ""
    def __init__(self, tipo, valor ):
        self.tipoToken = tipo
        self.valorToken = valor


