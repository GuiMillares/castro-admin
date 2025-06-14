import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaBars, FaCalendarDays, FaHouse, FaLayerGroup, FaPalette, FaRightFromBracket, FaRocket, FaRotateLeft, FaUserTie, FaXmark } from 'react-icons/fa6';
import { auth, db } from '../firebase';
import './dashboard.css';

const Dashboard = () => {
  const [panelVisible, setPanelVisible] = useState(false);
  const [activePicker, setActivePicker] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  
  const defaultColors = {
    '--header-bg-color': 'rgba(15, 23, 42, 0.95)',
    '--header-font-color': '#38bdf8',
    '--header-icon-color': '#60a5fa',
    '--dashboard-bg-color': 'rgba(255, 255, 255, 0.05)',
    '--card-font-color': '#ffffff',
    '--icon-font-color': '#60a5fa'
  };

  const [colors, setColors] = useState(defaultColors);

  // Verifica autenticação e carrega as cores
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await loadUserColors(user.uid);
      } else {
        setUserId(null);
        setColors(defaultColors);
        applyColors(defaultColors);
      }
    });

    return () => unsubscribe();
  }, []);

  // Carrega as cores do usuário
  const loadUserColors = async (uid) => {
    try {
      const docRef = doc(db, 'userPreferences', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists() && docSnap.data().colors) {
        setColors(docSnap.data().colors);
        applyColors(docSnap.data().colors);
      } else {
        await saveUserColors(defaultColors);
        applyColors(defaultColors);
      }
    } catch (error) {
      console.error("Erro ao carregar cores:", error);
      applyColors(defaultColors);
    }
  };

  const saveUserColors = async (colorsToSave) => {
    if (!userId) return;
    
    try {
      await setDoc(doc(db, 'userPreferences', userId), { // ERRO AQUI
        colors: colorsToSave
      }, { merge: true });
    } catch (error) {
      console.error("Erro ao salvar cores:", error);
    }
  };

  const applyColors = (colorsToApply) => {
    Object.entries(colorsToApply).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  const handleColorChange = (property) => (e) => {
    const newValue = e.target.value;
    const newColors = { ...colors, [property]: newValue };
    setColors(newColors);
    applyColors(newColors);
    saveUserColors(newColors);
  };

  const resetToDefault = async () => {
    setColors(defaultColors);
    applyColors(defaultColors);
    if (userId) {
      await saveUserColors(defaultColors);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const togglePanel = () => {
    setPanelVisible(!panelVisible);
    if (panelVisible) {
      setActivePicker(null);
    }
  };

  const togglePicker = (pickerId) => {
    setActivePicker(activePicker === pickerId ? null : pickerId);
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
        <div className="customizer-panel" aria-hidden="false" aria-label="Painel de personalização de cores">
          <button className="reset-btn" onClick={resetToDefault}>
            <FaRotateLeft /> Resetar para Padrão
          </button>
          
          <button onClick={() => togglePicker('header-bg-color')}>
            Fundo Cabeçalho {activePicker === 'header-bg-color' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'header-bg-color' && (
            <div className="color-picker">
              <input 
                type="color" 
                value={colors['--header-bg-color'] || '#0f172a'}
                onChange={handleColorChange('--header-bg-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('header-font-color')}>
            Fonte Cabeçalho {activePicker === 'header-font-color' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'header-font-color' && (
            <div className="color-picker">
              <input 
                type="color" 
                value={colors['--header-font-color'] || '#38bdf8'}
                onChange={handleColorChange('--header-font-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('header-icon-color')}>
            Ícones Cabeçalho {activePicker === 'header-icon-color' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'header-icon-color' && (
            <div className="color-picker">
              <input 
                type="color" 
                value={colors['--header-icon-color'] || '#60a5fa'}
                onChange={handleColorChange('--header-icon-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('dashboard-bg-color')}>
            Fundo Área Principal {activePicker === 'dashboard-bg-color' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'dashboard-bg-color' && (
            <div className="color-picker">
              <input 
                type="color" 
                value={colors['--dashboard-bg-color'] || '#0a192f'}
                onChange={handleColorChange('--dashboard-bg-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('card-font-color')}>
            Fonte Cards {activePicker === 'card-font-color' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'card-font-color' && (
            <div className="color-picker">
              <input 
                type="color" 
                value={colors['--card-font-color'] || '#ffffff'}
                onChange={handleColorChange('--card-font-color')} 
              />
            </div>
          )}

          <button onClick={() => togglePicker('icon-font-color')}>
            Ícones Cards {activePicker === 'icon-font-color' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
          {activePicker === 'icon-font-color' && (
            <div className="color-picker">
              <input 
                type="color" 
                value={colors['--icon-font-color'] || '#60a5fa'}
                onChange={handleColorChange('--icon-font-color')} 
              />
            </div>
          )}
        </div>
      )}

      <header className="app-header">
        <h1><FaRocket /> Synchro</h1>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaXmark /> : <FaBars />}
        </button>
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
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
      </main>

      <footer className="app-footer">
        &copy; 2025 Synchro. Plataforma inteligente para agendamentos profissionais.
      </footer>
    </div>
  );
};

export default Dashboard;