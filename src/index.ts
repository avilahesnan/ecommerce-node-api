import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";
import { DomainException } from "@shared/domain/domain.exception";
import { writeFile, readFile } from "fs";


try {
    let categoria: Categoria;
    categoria = Categoria.create({nome:'alimento'});
    console.log(categoria);

    let propsCategoria = {
        id:'5fac700e-2783-4682-99cf-0c9c1d9675b0',
        nome: 'mesa'
    };
    let categoria2: Categoria = Categoria.recover(propsCategoria);
    console.log(categoria2);
    console.log(categoria.equals(categoria2));

    let arrayCategorias = [];
    arrayCategorias.push(categoria.toDTO());
    arrayCategorias.push(categoria2.toDTO());

    writeFile('categorias.json', JSON.stringify(arrayCategorias), function(error:any){  
        if (error) throw error;
        console.log('Arquivo Salvo com Sucesso!');
        readFile('categorias.json', (error, data) => {
            if (error) throw error;
            console.log('Leitura de Arquivo!');
            let categoriaSalvas: [] = JSON.parse(data.toString());
            categoriaSalvas.forEach(categoriaJSON => {
                console.log(CategoriaMap.toDomain(categoriaJSON));
            });
        });
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

try {
    let produto: Produto;
    let categoria = Categoria.create({nome:'Qualquer'});
    produto = Produto.create({nome:'Geladeira', descricao:'Um geladeira muito bom', valor:2000, categorias:[categoria]});
    console.log(produto);
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