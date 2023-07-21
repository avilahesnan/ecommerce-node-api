import { Categoria } from "./modules/catalogo/domain/categoria.entity";
import { DomainException } from "./shared/domain/domain.exception";
import { writeFile } from "fs";


try {

    let categoria: Categoria;
    categoria = Categoria.create({nome:'cama'});
    console.log(categoria);

    let propsCategoria = {
        id:'5fac700e-2783-4682-99cf-0c9c1d9675b0',
        nome: 'mesa'
    };
    let categoria2: Categoria = Categoria.recover(propsCategoria);
    console.log(categoria2);
    console.log(categoria.equals(categoria2));

    writeFile('categorias.json', JSON.stringify(categoria), function(error:any){  
        if (error) throw error;
        console.log('Arquivo Salvo com Sucesso!');
    });


}
catch (error:any) {
    if (error instanceof DomainException) {
        console.log('Exceção de Domínio---------------------');
        console.log(error.message);
    }
    else {
        console.log('Outras Exceções ----------------------');
        console.log(error.message);
    }
}
finally {
    console.log('Ação que deve ser executada em caso de sucesso e em caso de exceção');
}