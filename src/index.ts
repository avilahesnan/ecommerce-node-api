import { Categoria } from "./modules/catalogo/domain/categoria.entity";
import { DomainException } from "./shared/domain/domain.exception";

try {   
    let categoria: Categoria;
    categoria = Categoria.create({nome: 'Alimento'});
    console.log(categoria);
} 
catch (error: any) {
    if (error instanceof DomainException) {
        console.log(error.message);
    }
}
finally {
    console.log(`Hello World!`);
}