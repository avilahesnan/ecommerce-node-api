import { categoriaRepositorio } from "@modules/catalogo/infra/database";
import { RecoverCategoriaByIdUseCase } from "./recover-categoria-by-id/recover-categoria-by-id.use-case";
import { RecoverAllCategoriasUseCase } from "./recover-all-categorias/recover-all-categorias.use-case";

export const recuperarCategoriaPorIdUseCase = new RecoverCategoriaByIdUseCase(categoriaRepositorio)
export const recuperarTodasCategoriasUseCase = new RecoverAllCategoriasUseCase(categoriaRepositorio);