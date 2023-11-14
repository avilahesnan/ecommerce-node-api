import { RecoverProdutoProps } from "@modules/catalogo/domain/produto/produto.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProdutoApplicationExceptions } from "../../exception/produto.application.exception";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";

export class AddCategoriaProdutoUseCase implements IUseCase<RecoverProdutoProps, boolean> {
    execute(input?: RecoverProdutoProps | undefined): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    
}