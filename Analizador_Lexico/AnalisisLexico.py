from Token import Token
from Token import Tipo
# from NOMBRE.PY import CLASE|METODO|ENUM

class Scanner:
    lista_tokens = list()   # lista de tokens
    lista_errores = list()  # lista errores lexico
    pos_errores = list()    # lista de posiciones de errores
    estado = 0
    lexema = ""

    def __init__(self):
        self.lista_tokens = list()
        self.lista_errores = list()
        self.pos_errores = list()
        self.estado = 0
        self.lexema = ""

    def analizar(self, cadena):
        self.entrada = cadena + "$"
        self.estado = 0
        self.caracterActual = ''

        for i in range(0,len(self.entrada)-1):
            self.caracterActual = self.entrada[i]
            
            # S0 -> S1 (Simbolos del Lenguaje)
            if self.caracterActual == "{":
                self.addToken(Tipo.LLAVEIZQ, "{")
            elif self.caracterActual == "}":
                self.addToken(Tipo.LLAVEDER, "}")
            elif self.caracterActual == ":":
                self.addToken(Tipo.DPUNTOS, ":")
            elif self.caracterActual == ";":
                self.addToken(Tipo.PCOMA, ";")
            elif self.caracterActual == ",":
                self.addToken(Tipo.COMA, ",")

            # S0 -> S2 (Numeros)
            elif self.caracterActual.isnumeric():
                longLexema = self.getLongLexema(self.entrada, i)
                self.S2(i, longLexema)
                i = i + longLexema

            # S0 -> Reservadas | Identificadores
            elif self.caracterActual.isalpha() :  
                longLexema = self.getLongLexema(self.entrada, i)
                self.analizar_Id_Reservada(i, longLexema)
                i = i + longLexema

            # Otros
            elif self.caracterActual == " " or self.caracterActual == "\t" or self.caracterActual == "\r" or self.caracterActual == "\n":  
                continue

            # Fin de Cadena o Estado Sumidero
            else:                    
                if self.caracterActual == "$" and i == len(self.entrada) -1:
                    if len(self.lista_errores > 0):
                        return "corregir los errores"
                    return "analisis exitoso...!!!"
                else:
                    self.pos_errores.append(i)
                    print("Error Lexico: ", self.caracterActual)

        if len(self.pos_errores)>0:
            return "La entrada que ingresaste fue: " + self.entrada + "\nExiten Errores Lexicos"
        else:
            return "La entrada que ingresaste fue: " + self.entrada + "\nAnalisis exitoso..!!!"
            

    

    def S2(self, inicio, fin):
        #reporte = "S2 -> s2" 
        self.cActual = ""     
        for i in range(inicio, inicio + fin):
            
            self.cActual = self.entrada[i]
            # S2 -> S2 (Numero)
            if self.caracterActual.isnumeric():
                self.lexema = self.lexema + self.cActual
                if(i == inicio + fin):
                    #reporte = "S2 -> S2"
                    #reporte = "Token Reconocido: Entero"
                    self.addToken(Tipo.ENTEROS, self.lexema)

            # S2 -> S3 (letra)
            elif self.caracterActual.isalpha():
                self.S3(inicio + i, fin-i) #TODO: REVISAR PUNTEROS
                break
            else:                    
                self.pos_errores.append(i)
                print("Error Lexico: ", self.caracterActual)
                #if(i == fin):
                #    break


    def S3(self, inicio, fin):
        self.cActual = ""
        for i in range(inicio,fin):
            self.cActual = self.entrada[i]
            # S2 -> S3 (letra)
            if self.caracterActual.isalpha():
                self.lexema += self.cActual
                if(i == fin):
                    self.addToken(Tipo.ENTEROS, self.lexema)
            else:
                self.pos_errores.append(i)




    def analizar_Id_Reservada(self, inicio, fin):
         for i in range(inicio,fin):
            self.cActual = self.entrada[i]

        

    def hayUnError(self, entrada, estado):
        
        return 0


    def addToken(self, tipo, valor):
        print("|"+valor+"|")
        nuevo = Token(tipo, valor)
        self.lista_tokens.append(nuevo)
        self.caracterActual = ""
        self.estado = 0
        self.lexema = ""


    def getLongLexema(self, entrada, posicion):
        longitud = 0
        for i in range(posicion,len(entrada)-1):
            if entrada != " ":# or entrada != "\n" or entrada != "\t" or entrada != "\r":
                longitud+=1
        
        return longitud - 1