import { categoriaRepositorio, produtoRepositorio } from "@modules/catalogo/infra/database";
import { RecoverCategoriaByIdUseCase } from "./recover-categoria-by-id/recover-categoria-by-id.use-case";
import { RecoverAllCategoriasUseCase } from "./recover-all-categorias/recover-all-categorias.use-case";
import { InsertCategoriaUseCase } from "./insert-categoria/insert-categoria.use-case";
import { UpdateCategoriaUseCase } from "./update-categoria/update-categoria.use-case";
import { DeleteCategoriaUseCase } from "./delete-categoria/delete-categoria.use-case";
import { RecoverProdutoByIdUseCase } from "./recover-produto-by-id/recover-produto-by-id.use-case";
import { RecoverAllProdutosUseCase } from "./recover-all-produtos/recover-all-produtos.use-case";
import { InsertProdutoUseCase } from "./insert-produto/insert-produto.use-case";
import { UpdateProdutoUseCase } from "./update-produto/update-produto.use-case";
import { DeleteProdutoUseCase } from "./delete-produto/delete-produto.use-case";
import { AddCategoriaProdutoUseCase } from "./add-categoria-produto/add-categoria-produto.use-case";
import { RecoverProdutosByCategoria } from "./recover-produtos-by-categoria/recover-produtos-by-categoria.use-case";
import { AlterStatusProdutoUseCase } from "./alter-status-produto/alter-status-produto.use-case";

export const recuperarCategoriaPorIdUseCase = new RecoverCategoriaByIdUseCase(categoriaRepositorio)
export const recuperarTodasCategoriasUseCase = new RecoverAllCategoriasUseCase(categoriaRepositorio)
export const inserirCategoriaUseCase = new InsertCategoriaUseCase(categoriaRepositorio)
export const atualizarCategoriaUseCase = new UpdateCategoriaUseCase(categoriaRepositorio)
export const deletarCategoriaUseCase = new DeleteCategoriaUseCase(categoriaRepositorio)

export const recupearProdutoPorIdUseCase = new RecoverProdutoByIdUseCase(produtoRepositorio)
export const recuperarTodosProdutosUseCase = new RecoverAllProdutosUseCase(produtoRepositorio)
export const inserirProdutoUseCase = new InsertProdutoUseCase(produtoRepositorio)
export const atualizarProdutoUseCase = new UpdateProdutoUseCase(produtoRepositorio)
export const deletarProdutoUseCase = new DeleteProdutoUseCase(produtoRepositorio)
export const adicionarCategoriaProdutoUseCase = new AddCategoriaProdutoUseCase(produtoRepositorio)
export const alterarStatusProdutoUseCase = new AlterStatusProdutoUseCase(produtoRepositorio)
export const recuperarProdutosPorCategoriaUseCase = new RecoverProdutosByCategoria(produtoRepositorio, categoriaRepositorio)