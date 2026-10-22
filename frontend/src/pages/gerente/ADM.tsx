import { useState } from "react";
import "./ADM.css";

const menuItems = [
  ["▦", "Dashboard"],
  ["▤", "Solicitações"],
  ["▦", "Calendário"],
  ["▱", "Veículos"],
  ["♙", "Motoristas"],
  ["⌕", "SVO"],
  ["▧", "Documentos"],
  ["▤", "Abastecimentos"],
  ["▥", "Relatórios"],
  ["♧", "Notificações"],
];

const periods = ["Hoje", "7 dias", "30 dias", "Personalizado"];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Hoje");

  return (
    <div className="fleet-dashboard">
      <aside className="fleet-sidebar">
        <div className="fleet-brand">
          <span className="fleet-brand-icon">▰</span>
          <span>
            <strong>Gestão de Frotas</strong>
            <small>Central de Transporte</small>
          </span>
        </div>

        <nav className="fleet-nav" aria-label="Menu principal">
          {menuItems.map(([icon, label], index) => (
            <a
              key={label}
              href="#"
              className={`fleet-nav-item ${index === 0 ? "active" : ""}`}
              aria-current={index === 0 ? "page" : undefined}
            >
              <span className="fleet-nav-icon" aria-hidden="true">{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="fleet-sidebar-bottom">
          <a href="#" className="fleet-nav-item">
            <span className="fleet-nav-icon" aria-hidden="true">⚙</span>
            <span>Configurações</span>
          </a>

          <div className="fleet-user">
            <span className="fleet-avatar">AD</span>
            <span className="fleet-user-info">
              <strong>Administrador</strong>
              <small>Administrador do Sistema</small>
            </span>
            <span className="fleet-user-arrow" aria-hidden="true">⌄</span>
          </div>
        </div>
      </aside>

      <div className="fleet-main">
        <header className="fleet-topbar">
          <div className="fleet-topbar-left">
            <button className="fleet-menu-button" type="button" aria-label="Abrir menu">
              ☰
            </button>
            <span>Dashboard</span>
          </div>

          <div className="fleet-topbar-right">
            <button className="fleet-notification" type="button" aria-label="Notificações">
              ♧<span>5</span>
            </button>
            <span className="fleet-avatar fleet-avatar-light">AD</span>
            <span className="fleet-topbar-user">
              <strong>Administrador</strong>
              <small>Administrador do Sistema</small>
            </span>
            <span aria-hidden="true">⌄</span>
          </div>
        </header>

        <main className="fleet-content">
          <div className="fleet-page-heading">
            <div>
              <h1>Dashboard</h1>
              <p>Visão geral da operação</p>
            </div>

            <div className="fleet-periods" aria-label="Período do dashboard">
              {periods.map((period) => (
                <button
                  key={period}
                  type="button"
                  className={selectedPeriod === period ? "selected" : ""}
                  onClick={() => setSelectedPeriod(period)}
                  aria-pressed={selectedPeriod === period}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <section className="fleet-empty-area" aria-label="Área vazia do dashboard" />
        </main>
      </div>
    </div>
  );
}
