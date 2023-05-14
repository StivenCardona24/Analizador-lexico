import { defineStore } from "pinia";
import { Token } from "@/interfaces/token.clase";
import { Category } from "@/interfaces/category.interface";
import { ref } from "vue";

export const useAnalyzerStore = defineStore("product", () => {


  // datos y operadores aceptados por el lenguaje


  const operadoresRelacionales = ["==", "!=", "<", ">", "<=", ">="];
  const operadoresLogicos = ["&&", "||", "!"];
  const palabrasReservadas = [
    "if",
    "else",
    "for",
    "while",
    "switch",
    "case",
    "return",
    "protected",
    "static",
    "class",
    "int",
    "float",
    "bool",
    "integer",
    "double",
    "String",
  ];

  const operadoresAsignacion = [
    "=",
    "+=",
    "-=",
    "=",
    "/=",
    "%=",
    "*=",
    "&=",
    "|=",
    "^=",
    "<<=",
    ">>=",
    "//=",
  ];

  const operadorIncrementoDecremento = ["++", "--"];

  const separadorComa = [","];
  const terminal = [";"];

  const operadoresAritmeticos = ["+", "-", "*", "/", "%"];



  const sourceCode = ref("");
  let listString: string | any[] = [];

  const tokens = ref<Token[]>([]);

  function analizar(): void {
    tokens.value = [];
    let i = 0;
    listString = obtenerPalabras(sourceCode.value);
    console.log(listString);
    while (i < listString.length) {
      const token = extraerSgteToken(i);
      if (token != null) {
        tokens.value.push(token);
        i = token?.indice_sgt;
      }
    }
  }

  //me retorna una lista de las palabras capturadas, en el lenguaje se debe tener en cuenta los espacios, para asignar variables, etc
  function obtenerPalabras(cadena: string): string[] {
    return cadena.split(/\s+/).filter((palabra) => palabra.trim() !== "");
  }

  function extraerSgteToken(indice: number): Token | null {


    let token: Token | null = extraerOperadorRelacional(indice);

    if (token !== null) {
      return token;
    }


    token = extraerComentarioLinea(indice)
    if (token !== null) {
      return token;
    }

    
    token = extraerComentarioBloque(indice)
    if (token !== null) {
      return token;
    }

    token = extraerOperadorLogico(indice);
    if (token !== null) {
      return token;
    }

    token = extraerEntero(indice);
    if (token !== null) {
      return token;
    }

    // token = extraerNaturales(indice);
    // if (token !== null) {
    //     return token;
    // }

    token = extraerDecimal(indice);
    if (token !== null) {
      return token;
    }

    token = extraerPalabraReservada(indice);
    if (token !== null) {
      return token;
    }


    token = extraerIdentificador(indice);
    if (token !== null) {
      return token;
    }


    token = extraerOperadorAsignacion(indice);
    if (token !== null) {
      return token;
    }

    token = extraerOperadorIncrementoDecremento(indice);
    if (token !== null) {
      return token;
    }

    token = extraerSeparadorComa(indice);
    if (token !== null) {
      return token;
    }

    token = extraerTerminal(indice);
    if (token !== null) {
      return token;
    }

    token = extraerParentesisApertura(indice);
    if (token !== null) {
      return token;
    }

    token = extraerParentesisCierre(indice);
    if (token !== null) {
      return token;
    }

    token = extraerLlavesApertura(indice);
    if (token !== null) {
      return token;
    }

    token = extraerLlavesCierre(indice);
    if (token !== null) {
      return token;
    }

    token = extraerHexadecimal(indice);
    if (token !== null) {
      return token;
    }

    token = extraerCadenaCaracteres(indice);
    if (token !== null) {
      return token;
    }

    token = extraerOperadorAritmetico(indice);
    if (token !== null) {
      return token;
    }

    token = extraerNoReconocido(indice);
    return token;
  }

  function extraerEntero(indice: number): Token | null {
    console.log(indice, listString[indice]);
    if (indice >= listString.length) {
      return null;
    }

    const regex = /^\d+$/;
    const numero = listString[indice];

    if (regex.test(numero)) {
      return new Token(numero, Category.ENTERO, indice + 1);
    } else {
      return null;
    }
  }


  function extraerDecimal(indice: number): Token | null {
    if (indice >= listString.length) {
      return null;
    }

    const regex = /^\d+(\.\d+)?$/;
    const numero = listString[indice];
    if (regex.test(numero)) {
      return new Token(numero, Category.REAL, indice + 1);
    } else {
      return null;
    }
  }

  function extraerIdentificador(indice: number): Token | null {
    console.log("ident")
    if (indice > listString.length) {
      return null;
    }
    console.log("idenwwwt")
    const regex = /^[A-Za-z][A-Za-z0-9]*$/
    const caracter = listString[indice];
    console.log( "xc", caracter);

    if (regex.test(caracter)) {
      return new Token(caracter, Category.IDENTIFICADOR, indice + 1);
    } else {
      return null;
    }
  }

  function extraerOperadorRelacional(indice: number): Token | null {
    const operador = listString[indice];
    if (operadoresRelacionales.includes(operador)) {
      return new Token(operador, Category.OPERADOR_RELACIONAL, indice + 1);
    }
    return null;
  }

  function extraerOperadorLogico(indice: number): Token | null {
    const operador = listString[indice];
    if (operadoresLogicos.includes(operador)) {
      return new Token(
        operador,
        Category.OPERADOR_LOGICO,
        indice + operador.length
      );
    }
    return null;
  }

  function extraerPalabraReservada(indice: number): Token | null {
    if (indice >= listString.length) {
      return null;
    }
    const palabra = listString[indice];
    if (palabrasReservadas.includes(palabra)) {
      return new Token(palabra, Category.PALABRA_RESERVADA, indice + 1);
    }
    return null;
  }

  function extraerOperadorAsignacion(indice: number): Token | null {
    const palabra = listString[indice];
    if (operadoresAsignacion.includes(palabra)) {
      return new Token(palabra, Category.OPERADOR_ASIGNACION, indice + 1);
    }
    return null;
  }

  function extraerOperadorIncrementoDecremento(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }
    const palabra = listString[indice];
    if (operadorIncrementoDecremento.includes(palabra)) {
      return new Token(
        palabra,
        Category.OPERADOR_INCREMENTO_DECREMENTO,
        indice + 1
      );
    }

    return null;
  }

  function extraerSeparadorComa(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }

    const palabra = listString[indice];
    if (separadorComa.includes(palabra)) {
      return new Token(palabra, Category.SEPARADOR, indice + 1);
    }
    return null;
  }

  function extraerTerminal(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }

    const palabra = listString[indice];
    if (terminal.includes(palabra)) {
      return new Token(palabra, Category.FIN_DE_SENTENCIA, indice + 1);
    }

    return null;
  }

  function extraerParentesisApertura(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }

    const buscar = "(";

    if (listString[indice] === buscar) {
      return new Token(buscar, Category.PARENTESIS_APERTURA, indice + 1);
    }

    return null;
  }

  function extraerParentesisCierre(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }

    const buscar = ")";
    if (listString[indice] === buscar) {
      return new Token(buscar, Category.PARENTESIS_CIERRE, indice + 1);
    }

    return null;
  }

  function extraerHexadecimal(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }
    const regex = /^0x[0-9A-Fa-f]+$/;
    const numero = listString[indice]
    if(regex.test(numero)){
      return new Token(numero, Category.HEXADECIMAL, indice + 1)
    }

    return null;
  }

  function extraerCadenaCaracteres(indice: number): Token | null {
    console.log("cadena")
    const palabra = listString[indice];
    if (indice >= listString.length || palabra[0] != '$') {
      return null;
    }

    console.log("cadena1")
  
    let fin = null;
    
    let inicio = indice + 1;
    
    if(listString[indice].length > 1) inicio = indice;

    for(let i = inicio; i < listString.length; i++){
      const palabra = listString[i];
      console.log("palabra", palabra)
      console.log("finalPalabra", palabra.slice(-1))
      if(palabra.slice(-1) == '$'){
        console.log("entreeeee")
        fin = i;
        break;
      }
    }

    console.log(fin)
    if (fin === null) {
      // No se encontró el cierre de la cadena
      return null;
    }
  
    // Iterar a partir de inicio hasta encontrar el otro "?" y agregar las palabras iteradas
    const palabras: string[] = [];
    for (let i = inicio; i <= fin; i++) {
      const palabra = listString[i].trim();
      if (palabra !== "") {
        palabras.push(palabra);
      }
    }
  
    return new Token(
      palabras.join(" "),
      Category.CADENA_CARACTERES,
      fin + 1
    );
  }


  function extraerComentarioLinea(indice: number): Token | null {
    console.log("cadena")
    const palabra = listString[indice];
    if (indice >= listString.length || palabra[0] != '@') {
      return null;
    }

    console.log("cadena1")
  
    let fin = null;
    
    let inicio = indice + 1;
    
    if(listString[indice].length > 1) inicio = indice;

    for(let i = inicio; i < listString.length; i++){
      const palabra = listString[i];
      console.log("palabra", palabra)
      console.log("finalPalabra", palabra.slice(-1))
      if(palabra.slice(-1) == '@'){
        console.log("entreeeee")
        fin = i;
        break;
      }
    }

    console.log(fin)
    if (fin === null) {
      // No se encontró el cierre de la cadena
      return null;
    }
  
    // Iterar a partir de inicio hasta encontrar el otro "?" y agregar las palabras iteradas
    const palabras: string[] = [];
    for (let i = inicio; i <= fin; i++) {
      const palabra = listString[i].trim();
      if (palabra !== "") {
        palabras.push(palabra);
      }
    }
  
    return new Token(
      palabras.join(" "),
      Category.COMENTARIO_LINEA,
      fin + 1
    );
  }

  function extraerComentarioBloque(indice: number): Token | null {
    console.log("cadena")
    const palabra = listString[indice];
    if (indice >= listString.length || palabra[0] != '#') {
      return null;
    }

    console.log("cadena1")
  
    let fin = null;
    
    let inicio = indice + 1;
    
    if(listString[indice].length > 1) inicio = indice;

    for(let i = inicio; i < listString.length; i++){
      const palabra = listString[i];
      console.log("palabra", palabra)
      console.log("finalPalabra", palabra.slice(-1))
      if(palabra.slice(-1) == '#'){
        console.log("entreeeee")
        fin = i;
        break;
      }
    }

    console.log(fin)
    if (fin === null) {
      // No se encontró el cierre de la cadena
      return null;
    }
  
    // Iterar a partir de inicio hasta encontrar el otro "?" y agregar las palabras iteradas
    const palabras: string[] = [];
    for (let i = inicio; i <= fin; i++) {
      const palabra = listString[i].trim();
      if (palabra !== "") {
        palabras.push(palabra);
      }
    }
  
    return new Token(
      palabras.join(" "),
      Category.COMENTARIO_BLOQUE,
      fin + 1
    );
  }

  function extraerOperadorAritmetico(indice: number): Token | null {
    
    const palabra = listString[indice];

      if (operadoresAritmeticos.includes(palabra)) {
        return new Token(
          palabra,
          Category.OPERADOR_ARITMETICO,
          indice + 1
        );
      }
    return null;
  }

  function extraerNoReconocido(indice: number): Token {
    return new Token(listString[indice], Category.NO_RECONOCIDO, indice + 1);
  }

  function extraerLlavesApertura(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }

    const buscar = "{";

    if (listString[indice] === buscar) {
      return new Token(
        listString[indice],
        Category.LLAVES_APERTURA,
        indice + 1
      );
    }

    return null;
  }

  function extraerLlavesCierre(indice: number): Token | null {
    if (indice < 0 || indice >= listString.length) {
      return null;
    }

    const buscar = "}";

    if (listString[indice] === buscar) {
      return new Token(listString[indice], Category.LLAVES_CIERRE, indice + 1);
    }

    return null;
  }

  return {
    sourceCode,
    analizar,
    tokens,
  };
});
