'''
		Aux. Huriel Gómez - 12/08/2020
		Interfaz grafica con Python y Tkinter
'''



from tkinter import *               # ventana
from tkinter import Menu            # barra de tareas
from tkinter import filedialog      # filechooser
from tkinter import scrolledtext    # textarea
from tkinter import messagebox      # message box

from analyze import lexer           # llamando a una funcion externa


class GUI:
    # Metodo que contiene la definicion de la interfaz grafica 
    def __init__(self):
        self.window = Tk()
        self.txtEntrada = Entry(self.window,width=10)
        self.txtConsola = Entry(self.window,width=10)
        # Propiedades de la ventana
        self.window.title("Proyecto 1 - ML WEB EDITOR")
        self.window.geometry('1000x700')
        self.window.configure(bg = '#9ACFEF')
        self.lbl = Label(self.window, text="ML WEB EDITOR", font=("Arial Bold", 15))
        self.lbl.place(x=440, y = 10)

        # propiedades del menu 
        self.menu = Menu(self.window)
        self.file_item = Menu(self.menu)  #Menu File
        self.file_item.add_command(label='Open File', command=self.abrirFile)
        self.file_item.add_separator()
        self.file_item.add_command(label='Analyze')
        self.file_item.add_separator()
        self.file_item.add_command(label='Exit')

        self.report_item = Menu(self.menu)    # menu Reports
        self.report_item.add_separator()
        self.report_item.add_command(label='Errors')
        self.report_item.add_separator()
        self.report_item.add_command(label='Tree')

        self.menu.add_cascade(label='File', menu=self.file_item)
        self.menu.add_cascade(label='Reports', menu=self.report_item)
        self.window.config(menu=self.menu)
        
        # propiedades del textarea
        self.txtEntrada = scrolledtext.ScrolledText(self.window,width=80,height=25)   # textArea Entrada
        self.txtEntrada.place(x=50, y = 50)
        #ent = txtEntrada.get("1.0","10.10")
        #print("ent: ",ent)


        self.lbl = Label(self.window, text="Console:")  #label 
        self.lbl.place(x=50, y = 465)
        self.txtConsola = scrolledtext.ScrolledText(self.window,width=80,height=10)   # textArea consola
        self.txtConsola.place(x=50, y = 490)
        self.btn = Button(self.window, text="Analyze", bg="black", fg="white", command=self.Analyze)    #btn Analyze
        self.btn.place(x=400, y = 460)
        # Dispara la interfaz
        self.window.mainloop()

    def Analyze(self):
        entrada = self.txtEntrada.get("1.0", END) #fila 1 col 0 hasta fila 2 col 10
        retorno = lexer(entrada)
        self.txtConsola.delete("1.0", END)
        self.txtConsola.insert("1.0", retorno)
        messagebox.showinfo('Project 1', 'Analysis Finished')

    # Dispara el Filechooser
    def abrirFile(self):
        nameFile=filedialog.askopenfilename(title = "Seleccione archivo",filetypes = (("js files","*.js"), ("html files","*.html"),("css files","*.css"),("All Files","*.*")))
        if nameFile!='':
            archi1=open(nameFile, "r", encoding="utf-8")
            contenido=archi1.read()
            archi1.close()
            self.txtEntrada.delete("1.0", END) 
            self.txtEntrada.insert("1.0", contenido)


start = GUI()
