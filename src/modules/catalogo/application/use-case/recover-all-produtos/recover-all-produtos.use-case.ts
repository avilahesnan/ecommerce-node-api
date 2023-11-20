import { Produto } from "@modules/catalogo/domain/produto/produto.entity"
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface"
import { IProduto } from "@modules/catalogo/domain/produto/produto.types"
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map"
import { IUseCase } from "@shared/application/use-case.interface"

export class RecoverAllProdutosUseCase implements IUseCase<void, Array<IProduto>> {

    private _produtoRepositorio: IProdutoRepository<Produto>

    constructor(repositorio: IProdutoRepository<Produto>){
        this._produtoRepositorio = repositorio
    }

    async execute(): Promise<IProduto[]> {
        
        const todosProdutos: Array<Produto> = await this._produtoRepositorio.recoverAll()

        const todosProdutosDTO = todosProdutos.map((produto) => ProdutoMap.toDTO(produto))

        return todosProdutosDTO
    }
}