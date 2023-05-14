import { Category } from "./category.interface";

export class Token {
    // Propiedades
    palabra: string;
    categoria: Category;
    indice_sgt: number
  
    // Constructor
    constructor(palabra: string, categoria: Category, indice_sgt: number) {
      this.palabra = palabra;
      this.categoria = categoria;
      this.indice_sgt = indice_sgt;
    }
  
    // Métodos
    
  }