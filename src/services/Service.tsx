
export { default as api } from "./api";

export { buscar, cadastrar, atualizar, deletar } from "./baseService";


export { cadastrarUsuario, login } from "./authService";


export {
    listarColaboradores,
    buscarColaboradorPorId,
    buscarColaboradoresPorNome,
    criarColaborador,
    atualizarColaborador,
    deletarColaborador,
    calcularSalarioColaborador,
} from "./colaboradorService";


export {
    listarCargos,
    buscarCargoPorId,
    buscarCargosPorDescricao,
    criarCargo,
    atualizarCargo,
    deletarCargo,
} from "./cargoService";
