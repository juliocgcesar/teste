import { useMemo, useState } from "react";
import "./MinhasSolicitacoes.css";

type Status =
  | "Pendente"
  | "Agendada"
  | "Aprovada"
  | "Recusada"
  | "Em andamento"
  | "Concluída";

interface Solicitacao {
  ticket: string;
  data: string;
  horario: string;
  destino: string;
  status: Status;
}

const solicitacoes: Solicitacao[] = [
  {
    ticket: "TRP-1044",
    data: "26/09/2026",
    horario: "14:00",
    destino: "Laboratório Central",
    status: "Pendente",
  },
  {
    ticket: "TRP-1043",
    data: "25/09/2026",
    horario: "10:15",
    destino: "Secretaria de Estado da Saúde",
    status: "Pendente",
  },
  {
    ticket: "TRP-1042",
    data: "24/09/2026",
    horario: "08:30",
    destino: "Hospital Universitário",
    status: "Agendada",
  },
  {
    ticket: "TRP-1041",
    data: "23/09/2026",
    horario: "13:30",
    destino: "Centro Administrativo",
    status: "Aprovada",
  },
  {
    ticket: "TRP-1040",
    data: "22/09/2026",
    horario: "09:00",
    destino: "Unidade de Saúde Farolândia",
    status: "Recusada",
  },
  {
    ticket: "TRP-1039",
    data: "22/09/2026",
    horario: "07:45",
    destino: "Hospital de Urgências",
    status: "Em andamento",
  },
  {
    ticket: "TRP-1035",
    data: "15/09/2026",
    horario: "11:00",
    destino: "Maternidade Nossa Senhora",
    status: "Concluída",
  },
];

const statusDisponiveis: Status[] = [
  "Pendente",
  "Agendada",
  "Aprovada",
  "Recusada",
  "Em andamento",
  "Concluída",
];

function dataBrasileiraParaDate(data: string): Date {
  const [dia, mes, ano] = data.split("/").map(Number);
  return new Date(ano, mes - 1, dia);
}

function Icone({
  nome,
}: {
  nome: "mais" | "busca" | "limpar" | "seta";
}) {
  const propriedades = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (nome) {
    case "mais":
      return (
        <svg {...propriedades}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "busca":
      return (
        <svg {...propriedades}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );
    case "limpar":
      return (
        <svg {...propriedades}>
          <path d="m18 6-12 12M6 6l12 12" />
        </svg>
      );
    case "seta":
      return (
        <svg {...propriedades}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
  }
}

export default function MinhasSolicitacoes() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [data, setData] = useState("");

  const solicitacoesFiltradas = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return solicitacoes.filter((solicitacao) => {
      const buscaNormalizada = busca.trim().toLowerCase().replace(/^#/, "");

      if (
        buscaNormalizada &&
        !solicitacao.ticket.toLowerCase().includes(buscaNormalizada)
      ) {
        return false;
      }

      if (status && solicitacao.status !== status) {
        return false;
      }

      if (periodo) {
        const dataLimite = new Date(hoje);
        dataLimite.setDate(hoje.getDate() - Number(periodo));

        if (dataBrasileiraParaDate(solicitacao.data) < dataLimite) {
          return false;
        }
      }

      if (data) {
        const [ano, mes, dia] = data.split("-").map(Number);
        const dataSelecionada = new Date(ano, mes - 1, dia);
        const dataSolicitacao = dataBrasileiraParaDate(solicitacao.data);

        if (dataSolicitacao.getTime() !== dataSelecionada.getTime()) {
          return false;
        }
      }

      return true;
    });
  }, [busca, status, periodo, data]);

  function limparFiltros() {
    setBusca("");
    setStatus("");
    setPeriodo("");
    setData("");
  }

  return (
    <section className="solicitacoes">
      <div className="solicitacoes__cabecalho">
        <div>
          <h2>Minhas Solicitações</h2>
          <p>Acompanhe suas solicitações de transporte.</p>
        </div>

        <button className="solicitacoes__botao-nova" type="button">
          <Icone nome="mais" />
          <span>Nova solicitação</span>
        </button>
      </div>

      <section className="solicitacoes__filtros" aria-label="Filtros">
        <label className="solicitacoes__campo solicitacoes__campo--busca">
          <span>Buscar por ticket</span>
          <div className="solicitacoes__entrada solicitacoes__entrada--busca">
            <Icone nome="busca" />
            <input
              type="search"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Ex.: TRP-1042"
            />
          </div>
        </label>

        <label className="solicitacoes__campo">
          <span>Status</span>
          <select
            className="solicitacoes__entrada"
            value={status}
            onChange={(evento) => setStatus(evento.target.value)}
          >
            <option value="">Todos os status</option>
            {statusDisponiveis.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </label>

        <label className="solicitacoes__campo">
          <span>Período</span>
          <select
            className="solicitacoes__entrada"
            value={periodo}
            onChange={(evento) => setPeriodo(evento.target.value)}
          >
            <option value="">Todo o período</option>
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
        </label>

        <label className="solicitacoes__campo">
          <span>Data</span>
          <input
            className="solicitacoes__entrada"
            type="date"
            value={data}
            onChange={(evento) => setData(evento.target.value)}
          />
        </label>

        <button
          className="solicitacoes__botao-limpar"
          type="button"
          onClick={limparFiltros}
        >
          <Icone nome="limpar" />
          <span>Limpar</span>
        </button>
      </section>

      <p className="solicitacoes__contagem" aria-live="polite">
        <strong>{solicitacoesFiltradas.length}</strong>{" "}
        {solicitacoesFiltradas.length === 1
          ? "solicitação encontrada"
          : "solicitações encontradas"}
      </p>

      <div className="solicitacoes__tabela-rolagem">
        <table className="solicitacoes__tabela">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Destino</th>
              <th>Status</th>
              <th className="solicitacoes__coluna-acoes">Ações</th>
            </tr>
          </thead>

          <tbody>
            {solicitacoesFiltradas.map((solicitacao) => (
              <tr key={solicitacao.ticket}>
                <td className="solicitacoes__ticket">
                  #{solicitacao.ticket}
                </td>
                <td>{solicitacao.data}</td>
                <td>{solicitacao.horario}</td>
                <td>{solicitacao.destino}</td>
                <td>
                  <span
                    className={`solicitacoes__status solicitacoes__status--${solicitacao.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {solicitacao.status}
                  </span>
                </td>
                <td className="solicitacoes__coluna-acoes">
                  <button
                    className="solicitacoes__botao-detalhes"
                    type="button"
                    aria-label={`Ver detalhes de ${solicitacao.ticket}`}
                  >
                    <span>Ver detalhes</span>
                    <Icone nome="seta" />
                  </button>
                </td>
              </tr>
            ))}

            {solicitacoesFiltradas.length === 0 && (
              <tr>
                <td className="solicitacoes__vazio" colSpan={6}>
                  Nenhuma solicitação encontrada com esses filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
  
}


