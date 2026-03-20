import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CarbonDataContext = createContext();

// Helper function to get current month key (YYYY-MM format)
const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Helper function to get month name from key
const getMonthName = (monthKey) => {
  const [year, month] = monthKey.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const initialState = {
  currentMonth: getCurrentMonthKey(),
  monthlyData: {
    [getCurrentMonthKey()]: {
      electricity: {
        kwh: 0,
        emissions: 0,
      },
      transport: {
        car: { km: 0, emissions: 0, type: 'car' },
        bus: { km: 0, emissions: 0, type: 'bus' },
        train: { km: 0, emissions: 0, type: 'train' },
        flight: { km: 0, emissions: 0, type: 'flight' },
      },
      waste: {
        kg: 0,
        emissions: 0,
      },
      totalEmissions: 0,
    }
  },
  // Legacy fields for backward compatibility
  electricity: {
    kwh: 0,
    emissions: 0,
  },
  transport: {
    car: { km: 0, emissions: 0, type: 'car' },
    bus: { km: 0, emissions: 0, type: 'bus' },
    train: { km: 0, emissions: 0, type: 'train' },
    flight: { km: 0, emissions: 0, type: 'flight' },
  },
  waste: {
    kg: 0,
    emissions: 0,
  },
  totalEmissions: 0,
  aiSuggestions: [
    {
      id: 1,
      title: "Switch to Renewable Energy",
      description: "Switch to renewable energy to save 2.5 tons of CO₂ annually",
      impact: "2.5 tons CO₂",
      category: "energy",
      icon: "⚡"
    },
    {
      id: 2,
      title: "Reduce Car Travel",
      description: "Reduce car travel by 10% to save 0.8 tons of CO₂ annually",
      impact: "0.8 tons CO₂",
      category: "transport",
      icon: "🚗"
    },
    {
      id: 3,
      title: "Improve Waste Management",
      description: "Recycle waste to cut emissions by 30%",
      impact: "30% reduction",
      category: "waste",
      icon: "♻️"
    },
    {
      id: 4,
      title: "Use Public Transport",
      description: "Switch to public transport for daily commute",
      impact: "1.2 tons CO₂",
      category: "transport",
      icon: "🚌"
    }
  ]
};

const carbonDataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MONTH':
      return {
        ...state,
        currentMonth: action.payload,
        // Update legacy fields for backward compatibility
        electricity: state.monthlyData[action.payload]?.electricity || { kwh: 0, emissions: 0 },
        transport: state.monthlyData[action.payload]?.transport || {
          car: { km: 0, emissions: 0, type: 'car' },
          bus: { km: 0, emissions: 0, type: 'bus' },
          train: { km: 0, emissions: 0, type: 'train' },
          flight: { km: 0, emissions: 0, type: 'flight' },
        },
        waste: state.monthlyData[action.payload]?.waste || { kg: 0, emissions: 0 },
        totalEmissions: state.monthlyData[action.payload]?.totalEmissions || 0,
      };

    case 'UPDATE_ELECTRICITY':
      const monthKey = action.payload.month || state.currentMonth;
      const electricityEmissions = action.payload.kwh * 0.5; // 0.5 kg CO2 per kWh
      
      // Ensure the month exists in monthlyData
      if (!state.monthlyData[monthKey]) {
        state.monthlyData[monthKey] = {
          electricity: { kwh: 0, emissions: 0 },
          transport: {
            car: { km: 0, emissions: 0, type: 'car' },
            bus: { km: 0, emissions: 0, type: 'bus' },
            train: { km: 0, emissions: 0, type: 'train' },
            flight: { km: 0, emissions: 0, type: 'flight' },
          },
          waste: { kg: 0, emissions: 0 },
          totalEmissions: 0,
        };
      }

      const updatedElectricity = {
        kwh: action.payload.kwh,
        emissions: electricityEmissions,
      };

      const updatedMonthlyData = {
        ...state.monthlyData,
        [monthKey]: {
          ...state.monthlyData[monthKey],
          electricity: updatedElectricity,
          totalEmissions: calculateTotalEmissions({
            ...state.monthlyData[monthKey],
            electricity: updatedElectricity
          })
        }
      };

      return {
        ...state,
        monthlyData: updatedMonthlyData,
        // Update legacy fields if this is the current month
        electricity: monthKey === state.currentMonth ? updatedElectricity : state.electricity,
        totalEmissions: monthKey === state.currentMonth ? updatedMonthlyData[monthKey].totalEmissions : state.totalEmissions,
      };
    
    case 'UPDATE_TRANSPORT':
      const transportMonthKey = action.payload.month || state.currentMonth;
      // Extract transport data from payload, excluding the 'month' property
      const { month, ...transportPayload } = action.payload;
      const transportData = { ...state.transport, ...transportPayload };
      
      // Calculate emissions for each transport mode and add to the data
      Object.keys(transportData).forEach(key => {
        if (transportData[key] && typeof transportData[key].km === 'number') {
          const transportType = transportData[key].type || key;
          transportData[key].emissions = transportData[key].km * getTransportEmissionsFactor(transportType);
        } else if (transportData[key] && !transportData[key].emissions) {
          transportData[key].emissions = 0;
        }
      });

      // Ensure the month exists in monthlyData
      if (!state.monthlyData[transportMonthKey]) {
        state.monthlyData[transportMonthKey] = {
          electricity: { kwh: 0, emissions: 0 },
          transport: {
            car: { km: 0, emissions: 0, type: 'car' },
            bus: { km: 0, emissions: 0, type: 'bus' },
            train: { km: 0, emissions: 0, type: 'train' },
            flight: { km: 0, emissions: 0, type: 'flight' },
          },
          waste: { kg: 0, emissions: 0 },
          totalEmissions: 0,
        };
      }

      const updatedMonthlyDataTransport = {
        ...state.monthlyData,
        [transportMonthKey]: {
          ...state.monthlyData[transportMonthKey],
          transport: transportData,
          totalEmissions: calculateTotalEmissions({
            ...state.monthlyData[transportMonthKey],
            transport: transportData
          })
        }
      };
      
      return {
        ...state,
        monthlyData: updatedMonthlyDataTransport,
        // Update legacy fields if this is the current month
        transport: transportMonthKey === state.currentMonth ? transportData : state.transport,
        totalEmissions: transportMonthKey === state.currentMonth ? updatedMonthlyDataTransport[transportMonthKey].totalEmissions : state.totalEmissions,
      };
    
    case 'UPDATE_WASTE':
      const wasteMonthKey = action.payload.month || state.currentMonth;
      const wasteEmissions = action.payload.kg * 2.53; // 2.53 kg CO2 per kg waste
      
      // Ensure the month exists in monthlyData
      if (!state.monthlyData[wasteMonthKey]) {
        state.monthlyData[wasteMonthKey] = {
          electricity: { kwh: 0, emissions: 0 },
          transport: {
            car: { km: 0, emissions: 0, type: 'car' },
            bus: { km: 0, emissions: 0, type: 'bus' },
            train: { km: 0, emissions: 0, type: 'train' },
            flight: { km: 0, emissions: 0, type: 'flight' },
          },
          waste: { kg: 0, emissions: 0 },
          totalEmissions: 0,
        };
      }

      const updatedWaste = {
        kg: action.payload.kg,
        emissions: wasteEmissions,
      };

      const updatedMonthlyDataWaste = {
        ...state.monthlyData,
        [wasteMonthKey]: {
          ...state.monthlyData[wasteMonthKey],
          waste: updatedWaste,
          totalEmissions: calculateTotalEmissions({
            ...state.monthlyData[wasteMonthKey],
            waste: updatedWaste
          })
        }
      };

      return {
        ...state,
        monthlyData: updatedMonthlyDataWaste,
        // Update legacy fields if this is the current month
        waste: wasteMonthKey === state.currentMonth ? updatedWaste : state.waste,
        totalEmissions: wasteMonthKey === state.currentMonth ? updatedMonthlyDataWaste[wasteMonthKey].totalEmissions : state.totalEmissions,
      };
    
    case 'RESET_DATA':
      return initialState;
    
    default:
      return state;
  }
};

const getTransportEmissionsFactor = (type) => {
  const factors = {
    car: 0.2, // kg CO2 per km
    bus: 0.1,
    train: 0.04,
    flight: 0.25
  };
  return factors[type] || 0.2;
};

const calculateTotalEmissions = (state) => {
  const electricityEmissions = state.electricity.emissions;
  const transportEmissions = Object.values(state.transport).reduce((total, mode) => {
    return total + (mode.emissions || 0);
  }, 0);
  const wasteEmissions = state.waste.emissions;
  
  return electricityEmissions + transportEmissions + wasteEmissions;
};

export const CarbonDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carbonDataReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('carbonData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach(key => {
        if (key === 'electricity') {
          dispatch({ type: 'UPDATE_ELECTRICITY', payload: { kwh: parsedData[key].kwh } });
        } else if (key === 'transport') {
          Object.keys(parsedData[key]).forEach(mode => {
            dispatch({ 
              type: 'UPDATE_TRANSPORT', 
              payload: { [mode]: { ...parsedData[key][mode], type: mode } }
            });
          });
        } else if (key === 'waste') {
          dispatch({ type: 'UPDATE_WASTE', payload: { kg: parsedData[key].kg } });
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carbonData', JSON.stringify(state));
  }, [state]);

  return (
    <CarbonDataContext.Provider value={{ state, dispatch }}>
      {children}
    </CarbonDataContext.Provider>
  );
};

export const useCarbonData = () => {
  const context = useContext(CarbonDataContext);
  if (!context) {
    throw new Error('useCarbonData must be used within a CarbonDataProvider');
  }
  return context;
};

// Export helper functions
export { getCurrentMonthKey, getMonthName };
