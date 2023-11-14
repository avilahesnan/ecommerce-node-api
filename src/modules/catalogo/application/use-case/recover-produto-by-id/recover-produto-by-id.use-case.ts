import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProdutoApplicationExceptions } from "../../exception/produto.application.exception";
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map";

export class RecoverProdutoByIdUseCase implements IUseCase<string, IProduto> {
    
    private _produtoRepositorio: IProdutoRepository<Produto>

    constructor(repositorio: IProdutoRepository<Produto>){
        this._produtoRepositorio = repositorio
    }
    
    async execute(uuid: string): Promise<IProduto> {
        
        const existeProduto: boolean = await this._produtoRepositorio.exists(uuid)

        if (!existeProduto) {
            throw new ProdutoApplicationExceptions.ProdutoNaoEncontrada()
        }

        const produto = await this._produtoRepositorio.recoverByUuid(uuid)

        return ProdutoMap.toDTO(produto as Produto)
    }

}