import React, { useState } from 'react';
import { vehiculosData } from './mock/vehiculos';
import ControlHeader from './components/ControlHeader';
import VehiculoCard from './components/VehiculoCard';
import { exportVerificacionesToCSV } from './utils/exportData';

const App = () => {
  const [vehiculos, setVehiculos] = useState(vehiculosData);
  const [view, setView] = useState('carros');

  const handleVerificacionSubmit = (vehiculoId, nuevaVerificacion) => {
    setVehiculos(prevVehiculos => 
      prevVehiculos.map(vehiculo => 
        vehiculo.id === vehiculoId 
          ? { 
              ...vehiculo, 
              verificaciones: [nuevaVerificacion, ...vehiculo.verificaciones],
              ultimaRevision: nuevaVerificacion.fecha
            } 
          : vehiculo
      )
    );
  };

  const handleExport = () => {
    exportVerificacionesToCSV(vehiculos);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ControlHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex space-x-2 items-center">
          <button
            onClick={() => setView('carros')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              view === 'carros' ? 'bg-[#2a9d8f] text-white' : 'bg-white text-[#2a9d8f] border border-[#2a9d8f]'
            }`}
          >
            Carros de Paro
          </button>
          <button
            onClick={() => setView('verificaciones')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              view === 'verificaciones' ? 'bg-[#2a9d8f] text-white' : 'bg-white text-[#2a9d8f] border border-[#2a9d8f]'
            }`}
          >
            Verificaciones
          </button>
          {view === 'verificaciones' && (
            <button
              onClick={handleExport}
              className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Exportar Historial
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vehiculos.map(vehiculo => (
            <VehiculoCard 
              key={vehiculo.id} 
              vehiculo={vehiculo} 
              onVerificacionSubmit={handleVerificacionSubmit}
              showVerificaciones={view === 'verificaciones'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

// DONE