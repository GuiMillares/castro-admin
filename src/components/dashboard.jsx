import React from 'react';
import { FaCalendarAlt, FaCut, FaGlobe, FaUserTie } from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  // Dados de exemplo
  const services = [
    { id: 1, name: 'Corte Social', duration: '30 min', price: 'R$ 50,00' },
    { id: 2, name: 'Barba Completa', duration: '40 min', price: 'R$ 40,00' }
  ];

  const professionals = [
    { id: 1, name: 'João Silva', specialty: 'Cabelo e Barba' },
    { id: 2, name: 'Maria Santos', specialty: 'Cortes Femininos' }
  ];

  const appointments = [
    { id: 1, client: 'Carlos Oliveira', professional: 'João Silva', service: 'Corte Social', time: '14:00' },
    { id: 2, client: 'Ana Pereira', professional: 'Maria Santos', service: 'Corte Feminino', time: '15:30' }
  ];

  return (
    <div className="dashboard-container">
      {/* Header responsivo */}
      <header>
        <h1>NascTime</h1>
        <nav>
          <ul>
            <li><FaUserTie size={14} /> Perfil</li>
          </ul>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Seção Serviços */}
          <div className="dashboard-section">
            <div className="section-header">
              <FaCut className="section-icon" size={16} />
              <h2>Serviços</h2>
            </div>
            <div className="section-content">
              <button className="add-button">+ Adicionar Serviço</button>
              <div className="items-list">
                {services.map(service => (
                  <div key={service.id} className="item-card">
                    <h3>{service.name}</h3>
                    <p>{service.duration} - {service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seção Profissionais */}
          <div className="dashboard-section">
            <div className="section-header">
              <FaUserTie className="section-icon" size={16} />
              <h2>Profissionais</h2>
            </div>
            <div className="section-content">
              <button className="add-button">+ Adicionar Profissional</button>
              <div className="items-list">
                {professionals.map(professional => (
                  <div key={professional.id} className="item-card">
                    <h3>{professional.name}</h3>
                    <p>{professional.specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seção Agenda */}
          <div className="dashboard-section">
            <div className="section-header">
              <FaCalendarAlt className="section-icon" size={16} />
              <h2>Agenda</h2>
            </div>
            <div className="section-content">
              <div className="calendar-header">
                <span>Hoje</span>
                <div className="calendar-nav">
                  <button>‹</button>
                  <span>12 Jun 2025</span>
                  <button>›</button>
                </div>
              </div>
              <div className="appointments-list">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-time">{appointment.time}</div>
                    <div className="appointment-details">
                      <h3>{appointment.client}</h3>
                      <p>{appointment.service} com {appointment.professional}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seção Site da Barbearia */}
          <div className="dashboard-section">
            <div className="section-header">
              <FaGlobe className="section-icon" size={16} />
              <h2>Site da Barbearia</h2>
            </div>
            <div className="section-content">
              <div className="customization-options">
                <button className="customize-button">
                  <FaGlobe size={14} /> Personalizar Tema
                </button>
                <button className="customize-button">
                  <FaGlobe size={14} /> Editar Conteúdo
                </button>
                <button className="customize-button">
                  <FaGlobe size={14} /> Visualizar Site
                </button>
              </div>
              <div className="site-preview">
                <p>Pré-visualização do seu site</p>
                <div className="preview-placeholder"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer completo */}
      <footer>
        <div className="footer-line"></div>
        <p>© 2025 NascTime. Plataforma inteligente para agendamentos profissionais.</p>
        <p>192.168.70.53</p>
      </footer>
    </div>
  );
};

export default Dashboard;