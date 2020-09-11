from Token import Tipo

class Parser:
    listaTokens = list()
    cont = 0
    bandera = True

    def __init__(self, listT):
        self.listaTokens = listT
        self.cont = 0
        self.bandera = True

    def getToken(self):
        token = self.listaTokens[self.cont]
        return token


    # begin -> ID '{' reglas '}'
    def begin(self):         #Equivalente a BEGIN
        cadError = ""
        token = self.getToken()
        self.cont+=1
        
        if(token.tipoToken == Tipo.ID):
            token = self.getToken()
            self.cont+=1

            if(token.tipoToken == Tipo.LLAVEIZQ):
                
                self.regla() #Llamando a la produccion

                token = self.getToken()
                print(token.tipoToken)
                #self.cont+=1
                if(token.tipoToken == Tipo.LLAVEDER):
                    
                    if(self.bandera == False and len(self.listaTokens) < self.cont):
                        return "Existen errores sintacticos..!!! \n" +cadError
                    else: 
                        return "Cadena valida sintacticamente..!!!"

                else:
                    cadError ="Error Sintactico, se esperaba un '}'"
                    self.bandera = False
            else:
                cadError ="Error Sintactico, se esperaba un '{'"
                self.bandera = False
        else:
            cadError ="Error Sintactico, se esperaba un ID"
            self.bandera = False
    
        if(self.bandera == False):
            return "Existen errores sintacticos..!!! \n" +cadError
        else: 
            return "Cadena valida sintacticamente..!!!"

    
    # regla -> reservada ':' NUMERO
    def regla(self):

        self.bandera = self.reservada() #Llamando a la produccion
        #if(self.bandera == False):
        #    return False

        token = self.getToken()
        
        if(token.tipoToken == Tipo.DPUNTOS):
            self.bandera = True
            self.cont+=1
            token = self.getToken()
            if(token.tipoToken == Tipo.VALOR):
                self.bandera = True
                self.cont+=1
                return True
            else:
                self.cadError ="Error Sintactico, se esperaba un NUMERO"
                self.bandera = False
        else:
            self.cadError ="Error Sintactico, se esperaba un ':'"
            self.bandera = False

    #RESERVADA -> color
    #           | top
    #           | margin
    #           | background-color

    def reservada(self):
        token = self.getToken()
        if(token.tipoToken == Tipo.COLOR or token.tipoToken == Tipo.TOP or token.tipoToken == Tipo.MARGIN_TOP or token.tipoToken == Tipo.BACK_COLOR):
            self.bandera = True
            self.cont+=1
        else:
            self.cadError ="Error Sintactico, se esperaba una reservada (COLOR|TOP|MARGIN-TOP|BACKGROUD-COLOR)"
            self.bandera = False


'''
        pos = 0
        while pos < len(self.listaTokens):
            token = self.listaTokens[pos] 
            print(token.tipoToken)
            pos +=1


    BEGIN -> id '{' LISTA_REGLA '}'

    LISTA_REGLA -> REGLA ';' LISTA_REGLA
        | EPSILON

    REGLA -> RESERVADA ':' NUMERO

    RESERVADA -> color
            | top
            | margin
'''