import { RecoverProdutoProps } from "@modules/catalogo/domain/produto/produto.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProdutoApplicationExceptions } from "../../exception/produto.application.exception";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";

export class AddCategoriaProdutoUseCase implements IUseCase<RecoverProdutoProps, boolean> {
    
    private _produtoRepositorio: IProdutoRepository<Produto>

    constructor(repositorio: IProdutoRepository<Produto>){
        this._produtoRepositorio = repositorio
    }

    async execute(produtoProps: RecoverProdutoProps): Promise<boolean> {
        const existeProduto: boolean = await this._produtoRepositorio.exists(produtoProps.id)

        if (!existeProduto) {
            throw new ProdutoApplicationExceptions.ProdutoNaoEncontrada()
        }

        const produto: Produto = Produto.recover(produtoProps)

        const categoria: Categoria = Categoria.create({nome: 'Mesa'})

        const produtoCategoriaAdicionada = await this._produtoRepositorio.addCategoria(produto, categoria)

        return produtoCategoriaAdicionada
    }
    
    
}