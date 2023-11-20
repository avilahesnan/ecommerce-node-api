import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity"
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface"
import { CategoriaPrismaRepository } from "./categoria.prisma.repository"
import { prisma } from "@main/infra/database/orm/prisma/client"
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface"
import { Produto } from "@modules/catalogo/domain/produto/produto.entity"
import { ProdutoPrismaRepository } from "./produto.prisma.repository"

export const categoriaRepositorio: ICategoriaRepository<Categoria> = new CategoriaPrismaRepository(prisma)
export const produtoRepositorio: IProdutoRepository<Produto> = new ProdutoPrismaRepository(prisma)