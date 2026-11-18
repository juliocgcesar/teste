import { registrarFalha } from '../../shared/logging/logger.js';
import { enviarJson as jsonCompartilhado } from '../../shared/http/json.js';
import { obterIndicadores } from './dashboard.service.js';
import { responderErroHttp } from '../../shared/http/errors.js';
import { buscarPendencias } from './dashboard.pendencias.js';
/** Responde o painel base mantendo seu envelope atual. */
export function dashboardController(response) {
    jsonCompartilhado(response, 200, {
        data: {},
    });
}
/** Consulta pendências existentes com falhas técnicas seguras. */
export async function pendenciasController(response) {
    try {
        const pendencias = await buscarPendencias();
        jsonCompartilhado(response, 200, {
            data: pendencias,
        });
    }
    catch (erro) {
        registrarFalha(erro);
        jsonCompartilhado(response, 500, {
            error: {
                code: 'ERRO_INTERNO',
                message: 'Não foi possível consultar as pendências.',
            },
        });
    }
}
/** Publica gráficos reais no mesmo snapshot e preserva o envelope de falha existente. */
export async function dashboardGraficosController(response, params = new URLSearchParams()) {
    try {
        jsonCompartilhado(response, 200, await obterIndicadores(params, false));
    }
    catch (erro) {
        if (responderErroHttp(response, erro))
            return;
        registrarFalha(erro);
        jsonCompartilhado(response, 500, { error: { code: 'FALHA_INTERNA', message: 'Erro inesperado ao processar os dados dos gráficos.' } });
    }
}
/** Publica fila atual, coorte por saída e indisponibilidade explícita sem fabricar elegibilidade. */
export async function dashboardGestorController(response, params = new URLSearchParams()) {
    try {
        jsonCompartilhado(response, 200, await obterIndicadores(params, true));
    }
    catch (erro) {
        if (responderErroHttp(response, erro))
            return;
        registrarFalha(erro);
        jsonCompartilhado(response, 500, { error: { code: 'ERRO_INTERNO', message: 'Erro inesperado ao processar os dados do dashboard.' } });
    }
}
