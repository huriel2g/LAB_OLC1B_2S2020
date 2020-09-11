from Token import Token
from Token import Tipo
# from NOMBRE.PY import CLASE|METODO|ENUM


class Scanner:
    lista_tokens = list()   # lista de tokens
    lista_errores = list()  # lista errores lexico
    pos_errores = list()    # lista de posiciones de errores
    # estado = 0
    lexema = ""

    def __init__(self):
        self.lista_tokens = list()
        self.lista_errores = list()
        self.pos_errores = list()
        self.estado = 0
        self.lexema = ""

    def getListaTokens(self):
        return self.lista_tokens

    #--------------------------- ESTADO0 ---------------------------
    def analizar(self, cadena):
        self.entrada = cadena + "$"
        #self.estado = 0
        self.caracterActual = ''
        
        pos = 0    # almacena la posicion del caracter que se esta analizando
        #for self.pos in range(0,len(self.entrada)-1):
        while pos < len(self.entrada):
            self.caracterActual = self.entrada[pos]            
            
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
                sizeLexema = self.getSizeLexema(pos)
                self.S2(pos, pos+sizeLexema)
                pos = pos+sizeLexema
                
            # S0 -> Reservadas | Identificadores
            elif self.caracterActual.isalpha() :  
                sizeLexema = self.getSizeLexema(pos)
                self.analizar_Id_Reservada(pos, pos+sizeLexema)
                pos = pos+sizeLexema
            
            # S0 -> '#'
            elif self.caracterActual == "#" :  
                sizeLexema = self.getSizeLexema(pos)
                self.analizar_Id_Reservada(pos, pos+sizeLexema)
                pos = pos+sizeLexema

            # Otros
            elif self.caracterActual == " " or self.caracterActual == "\t" or self.caracterActual == "\r" or self.caracterActual == "\n":  
                pos += 1 #incremento del contador del while
                continue

            else:                    
                # S0 -> FIN_CADENA
                if self.caracterActual == "$" and pos == len(self.entrada)-1:
                    if len(self.lista_errores) > 0:
                        return "corregir los errores"
                    return "analisis exitoso...!!!"
                #  S0 -> ERROR_LEXICO
                else:
                    self.pos_errores.append(pos)
                    print("Error Lexico: ", self.caracterActual)

            pos += 1 #incremento del contador del while

        if len(self.pos_errores)>0:
            return "La entrada que ingresaste fue: " + self.entrada + "\nExiten Errores Lexicos"
        else:
            return "La entrada que ingresaste fue: " + self.entrada + "\nAnalisis exitoso..!!!"
            

    #--------------------------- ESTADO2 ---------------------------
    def S2(self, posActual, fin):
        c = '' 
        while posActual < fin:
            c = self.entrada[posActual]

            # S2 -> S2 (Numero)
            if c.isnumeric():
                self.lexema += c
                if(posActual+1 == fin):
                    self.addToken(Tipo.VALOR, self.lexema)
                
            # S2 -> S3 (letra)
            elif c.isalpha():
                self.S3(posActual, fin)
                break

            # S2 -> ERROR_LEXICO
            else:                    
                self.pos_errores.append(posActual)
                print("Error Lexico: ", c)
            
            posActual += 1

    #--------------------------- ESTADO3 ---------------------------
    def S3(self, posActual, fin):
        c = ''
        while posActual < fin:
            c = self.entrada[posActual]
        
            # S3 -> S3 (letra)
            if c.isalpha():
                self.lexema += c
                if(posActual+1 == fin):
                    self.addToken(Tipo.VALOR, self.lexema)
                    
            # S2 -> ERROR_LEXICO
            else:
                self.pos_errores.append(posActual)
                print("Error Lexico: ", c)
            posActual += 1

    #--------------------------- RESERVADAS/ID ---------------------------
    def analizar_Id_Reservada(self, posActual, fin):
        for x in range(posActual,fin):
            self.lexema += self.entrada[x]

        # S0 -> S4 (Palabras Reservadas)
        if (self.lexema.lower() == "color"):
            self.addToken(Tipo.COLOR, "color")
            return
        elif(self.lexema.lower() == "font-size"):
            self.addToken(Tipo.FSIZE, "font-size")
            return
        elif(self.lexema.lower() == "position"):
            self.addToken(Tipo.POS, "position")
            return
        elif(self.lexema.lower() == "top"):
            self.addToken(Tipo.TOP, "top")
            return
        elif(self.lexema.lower() == "background-color"):
            self.addToken(Tipo.BACK_COLOR, "background-color")
            return
        elif(self.lexema.lower() == "margin-top"):
            self.addToken(Tipo.MARGIN_TOP, "margin-top")
            return

        self.lexema = ""
        c = ''
        while posActual < fin:
            c = self.entrada[posActual]
            
            # S0 -> S5 ('#')
            if c == "#":
                self.lexema += c
                
                # S5 -> S6 (letra)
                self.S6(posActual+1, fin)
                break

            # S0 -> S6 (letra)
            elif c.isalpha():
                self.S6(posActual, fin)
                break
            
            # S0 -> ERROR_LEXICO
            else:
                self.pos_errores.append(posActual)
                print("Error Lexico: ", c)
            
            posActual += 1
            
    #--------------------------- ESTADO6 ---------------------------
    def S6(self, posActual, fin):
        c = ''
        while posActual < fin:
            c = self.entrada[posActual]
        
            # S6 -> S6 (letra)
            if c.isalpha():
                self.lexema += c
                if(posActual+1 == fin):
                    self.addToken(Tipo.ID, self.lexema)

            # S6 -> S6 (Numero)
            elif c.isnumeric():
                self.lexema += c
                if(posActual+1 == fin):
                    self.addToken(Tipo.ID, self.lexema)
            
            # S6 -> S6 ('-')
            elif c == "-":
                self.lexema += c
                if(posActual+1 == fin):
                    self.addToken(Tipo.ID, self.lexema)

            # S6 -> ERROR_LEXICO
            else:
                self.pos_errores.append(posActual)
                print("Error Lexico: ", c)

            posActual += 1

    #--------------------------- ESTADO_ERROR ---------------------------
    def addError(self, entrada, estado):
        
        return 0


    #--------------------------- ADD TOKEN ---------------------------
    def addToken(self, tipo, valor):
    #print("|"+valor+"|")
        nuevo = Token(tipo, valor)
        self.lista_tokens.append(nuevo)
        self.caracterActual = ""
        self.estado = 0
        self.lexema = ""

    #---------------- OBTENIENDO EL TAMAÑO DEL LEXEMA ----------------
    def getSizeLexema(self, posInicial):
        longitud = 0
        for i in range(posInicial, len(self.entrada)-1):
            if self.entrada[i] == " " or self.entrada[i] == "{" or self.entrada[i] == "}" or self.entrada[i] == "," or self.entrada[i] == ";" or self.entrada[i] == ":" or self.entrada[i] == "\n" or self.entrada[i] == "\t" or self.entrada[i] == "\r":# or self.entrada[i] == "$":
                break
            longitud+=1
        return longitud