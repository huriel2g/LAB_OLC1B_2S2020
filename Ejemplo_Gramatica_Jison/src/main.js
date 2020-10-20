
function Analizar(){
    //Obtengo el texto de mi editor
    let jtxtJSharp = ace.edit("Editor");
    var entrada = jtxtJSharp.getSession().getValue();
    //console.log("la entrada es: "+entrada);
    //Llamado al archivo ".js" generado por jison
    var salida = Analisis.parse(entrada);
    //console.log("la salida es: "+entrada);
    
    //Imprimiendo el valor obtenido en el analisis
    if(salida != null){
        var consola3D = ace.edit("Console");
        consola3D.getSession().setValue(salida);
    }else {
        var consola3D = ace.edit("Console");
        consola3D.getSession().setValue("Hubo un error en el analisis");
    }  
}