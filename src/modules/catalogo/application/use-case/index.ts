import { categoriaRepositorio, produtoRepositorio } from "@modules/catalogo/infra/database";
import { RecoverCategoriaByIdUseCase } from "./recover-categoria-by-id/recover-categoria-by-id.use-case";
import { RecoverAllCategoriasUseCase } from "./recover-all-categorias/recover-all-categorias.use-case";
import { InsertCategoriaUseCase } from "./insert-categoria/insert-categoria.use-case";
import { UpdateCategoriaUseCase } from "./update-categoria/update-categoria.use-case";
import { DeleteCategoriaUseCase } from "./delete-categoria/delete-categoria.use-case";
import { RecoverProdutoByIdUseCase } from "./recover-produto-by-id/recover-produto-by-id.use-case";

export const recuperarCategoriaPorIdUseCase = new RecoverCategoriaByIdUseCase(categoriaRepositorio)
export const recuperarTodasCategoriasUseCase = new RecoverAllCategoriasUseCase(categoriaRepositorio)
export const inserirCategoriaUseCase = new InsertCategoriaUseCase(categoriaRepositorio)
export const atualizarCategoriaUseCase = new UpdateCategoriaUseCase(categoriaRepositorio)
export const deletarCategoriaUseCase = new DeleteCategoriaUseCase(categoriaRepositorio)

export const recupearProdutoPorIdUseCase = new RecoverProdutoByIdUseCase(produtoRepositorio)