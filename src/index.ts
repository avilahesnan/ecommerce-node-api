import { Categoria } from "./modules/catalogo/domain/categoria.entity";

let categoria: Categoria;
try {   
    categoria = Categoria.create({nome: 'Alimento'});
    console.log(categoria);
} catch (error: any) {
    console.log(error.message);
}