import { Produto } from "@modules/catalogo/domain/produto/produto.entity"
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface"
import { IUseCase } from "@shared/application/use-case.interface"
import { ProdutoApplicationExceptions } from "../../exception/produto.application.exception"

export class  DeleteProdutoUseCase implements IUseCase<string, boolean> {
    
    private _produtoRepositorio: IProdutoRepository<Produto>

    constructor(repositorio: IProdutoRepository<Produto>){
        this._produtoRepositorio = repositorio
    }

    async execute(uuid: string): Promise<boolean> {

        const existeProduto: boolean = await this._produtoRepositorio.exists(uuid)

        if (!existeProduto) {
            throw new ProdutoApplicationExceptions.ProdutoNaoEncontrada()
        }

        const deletouProduto: boolean = await this._produtoRepositorio.delete(uuid)

        return deletouProduto
    }
}