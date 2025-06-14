import { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaCalendarDays, FaClock, FaHouse, FaLayerGroup, FaPalette, FaPuzzlePiece, FaRightFromBracket, FaUserTie } from 'react-icons/fa6';
import './dashboard.css';

const Dashboard = () => {
  const [panelVisible, setPanelVisible] = useState(false);
  const [activePicker, setActivePicker] = useState(null);

  const togglePanel = () => {
    setPanelVisible(!panelVisible);
    if (panelVisible) {
      setActivePicker(null);
    }
  };

  const togglePicker = (pickerId) => {
    setActivePicker(activePicker === pickerId ? null : pickerId);
  };

  // Color change handlers
  const handleColorChange = (property) => (e) => {
    document.documentElement.style.setProperty(property, e.target.value);
  };

  return (
    <div className="dashboard-app">
      <button 
        className="customize-btn" 
        title="Personalizar Cores"
        onClick={togglePanel}
      >
        <FaPalette /> Cores
      </button>

      {panelVisible && (
        <div 
          className="customizer-panel" 
          aria-hidden="false" 
          aria-label="Painel de personalização de cores"
        >
          <button onClick={() => togglePicker('headerBgColor')}>
            Fundo Cabeçalho {activePicker === 'headerBgColor' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'headerBgColor' && (
            <div className="color-picker">
              <input 
                type="color" 
                defaultValue="#0f172a" 
                onChange={handleColorChange('--header-bg-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('headerFontColor')}>
            Fonte Cabeçalho {activePicker === 'headerFontColor' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'headerFontColor' && (
            <div className="color-picker">
              <input 
                type="color" 
                defaultValue="#38bdf8" 
                onChange={handleColorChange('--header-font-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('headerIconColor')}>
            Ícones Cabeçalho {activePicker === 'headerIconColor' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'headerIconColor' && (
            <div className="color-picker">
              <input 
                type="color" 
                defaultValue="#60a5fa" 
                onChange={handleColorChange('--header-icon-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('dashboardBgColor')}>
            Fundo Área Principal {activePicker === 'dashboardBgColor' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'dashboardBgColor' && (
            <div className="color-picker">
              <input 
                type="color" 
                defaultValue="#0a192f" 
                onChange={handleColorChange('--dashboard-bg-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('cardFontColor')}>
            Fonte Cards {activePicker === 'cardFontColor' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'cardFontColor' && (
            <div className="color-picker">
              <input 
                type="color" 
                defaultValue="#ffffff" 
                onChange={handleColorChange('--card-font-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('iconFontColor')}>
            Ícones Cards {activePicker === 'iconFontColor' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'iconFontColor' && (
            <div className="color-picker">
              <input 
                type="color" 
                defaultValue="#60a5fa" 
                onChange={handleColorChange('--icon-font-color')} 
              />
            </div>
          )}
        </div>
      )}

      <header className="app-header">
        <h1><FaClock /> NascTime</h1>
        <nav className="nav-menu">
          <ul>
            <li><FaHouse /><span>Início</span></li>
            <li><FaLayerGroup /><span>Serviços</span></li>
            <li><FaUserTie /><span>Profissionais</span></li>
            <li><FaCalendarDays /><span>Agenda</span></li>
            <li><FaRightFromBracket /><span>Sair</span></li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-container">
        <div className="card">
          <FaLayerGroup className="card-icon" />
          <h2>Serviços</h2>
          <p>Cadastre e gerencie os serviços que você oferece aos seus clientes.</p>
        </div>
        <div className="card">
          <FaUserTie className="card-icon" />
          <h2>Profissionais</h2>
          <p>Adicione os profissionais que fazem parte da sua equipe.</p>
        </div>
        <div className="card">
          <FaCalendarDays className="card-icon" />
          <h2>Agenda</h2>
          <p>Visualize e acompanhe os agendamentos por profissional.</p>
        </div>
        <div className="card">
          <FaPuzzlePiece className="card-icon" />
          <h2>Personalizar Plugin</h2>
          <p>Configure e adapte os plugins para melhorar sua experiência.</p>
        </div>
      </main>

      <footer className="app-footer">
        &copy; 2025 NascTime. Plataforma inteligente para agendamentos profissionais.
      </footer>
    </div>
  );
};

export default Dashboard;