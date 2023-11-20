import { Produto } from "@modules/catalogo/domain/produto/produto.entity"
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface"
import { CreateProdutoProps, IProduto } from "@modules/catalogo/domain/produto/produto.types"
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map"
import { IUseCase } from "@shared/application/use-case.interface"

export class InsertProdutoUseCase implements IUseCase<CreateProdutoProps, IProduto> {

    private _produtoRepositorio: IProdutoRepository<Produto>

    constructor(repositorio: IProdutoRepository<Produto>){
        this._produtoRepositorio = repositorio
    }

    async execute(produtoProps: CreateProdutoProps): Promise<IProduto> {

        const produto: Produto = Produto.create(produtoProps)

        const produtoInserido = await this._produtoRepositorio.insert(produto)

        return ProdutoMap.toDTO(produtoInserido)
    }
}