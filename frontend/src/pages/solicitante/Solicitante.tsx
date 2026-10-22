import { useState } from "react";
import MinhasSolicitacoes from "../../features/solicitacoes/MinhasSolicitacoes";
import "./Solicitante.css";

type IconName = "car" | "plus" | "list" | "bell" | "logout" | "chevron";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "car":
      return (
        <svg {...common}>
          <path d="M5 17h14l1-6-2-5H6l-2 5 1 6Z" />
          <path d="M6 11h12M7 17v2m10-2v2M7 14h.01M17 14h.01" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );

    case "list":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h4" />
        </svg>
      );

    case "bell":
      return (
        <svg {...common}>
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        </svg>
      );

    case "logout":
      return (
        <svg {...common}>
          <path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m14 6-6 6 6 6" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Solicitante() {
  const [menuRecolhido, setMenuRecolhido] = useState(false);

  return (
    <div
      className={`dashboard ${
        menuRecolhido ? "dashboard--recolhido" : ""
      }`}
    >
      <aside className="sidebar">
        <div className="sidebar__marca">
          <span className="sidebar__icone-marca">
            <Icon name="car" />
          </span>

          <div className="sidebar__texto-marca">
            <strong>Gestão de Frotas</strong>
            <small>Central de Transporte</small>
          </div>
        </div>

        <button
          className="sidebar__recolher"
          type="button"
          aria-label={menuRecolhido ? "Expandir menu" : "Recolher menu"}
          aria-expanded={!menuRecolhido}
          onClick={() => setMenuRecolhido((atual) => !atual)}
        >
          <Icon name="chevron" />
        </button>

        <nav className="sidebar__navegacao" aria-label="Menu principal">
          <a className="sidebar__item" href="#nova-solicitacao">
            <Icon name="plus" />
            <span>Nova Solicitação</span>
          </a>

          <a
            className="sidebar__item sidebar__item--ativo"
            href="#minhas-solicitacoes"
            aria-current="page"
          >
            <Icon name="list" />
            <span>Minhas Solicitações</span>
          </a>

          <a className="sidebar__item" href="#notificacoes">
            <Icon name="bell" />
            <span>Notificações</span>
          </a>
        </nav>

        <div className="sidebar__rodape">
          <div className="sidebar__usuario">
            <span className="avatar">MS</span>

            <div className="sidebar__dados-usuario">
              <strong>Mariana Santos</strong>
              <small>Hemose · Solicitante</small>
            </div>
          </div>

          <a className="sidebar__item sidebar__sair" href="#sair">
            <Icon name="logout" />
            <span>Sair</span>
          </a>
        </div>
      </aside>

      <div className="dashboard__principal">
        <header className="topbar">
          <h1>Minhas solicitações</h1>

          <div className="topbar__usuario">
            <button
              className="topbar__notificacoes"
              type="button"
              aria-label="Notificações"
            >
              <Icon name="bell" />
              <span className="topbar__ponto" />
            </button>

            <div className="topbar__dados">
              <strong>Mariana Santos</strong>
              <small>Hemose</small>
            </div>

            <span className="avatar avatar--topo">MS</span>
          </div>
        </header>

        <main className="dashboard__conteudo">
          <MinhasSolicitacoes />
        </main>
      </div>
    </div>
  );
}
