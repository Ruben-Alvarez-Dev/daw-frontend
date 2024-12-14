import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './ListComponent.css';

const ListComponent = ({ type }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (type) {
      loadItems();
    }
  }, [type]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await api.getList(type);
      setItems(data || []);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      setError(`Error al cargar los ${type}`);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/app/${type}/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      try {
        await api.delete(type, id);
        await loadItems();
      } catch (err) {
        console.error('Error deleting item:', err);
        setError('Error al eliminar el elemento');
      }
    }
  };

  const handleAddNew = () => {
    navigate(`/app/${type}/new`);
  };

  if (!type) {
    return <div className="list-component">Tipo de lista no especificado</div>;
  }

  if (loading) {
    return <div className="list-component">Cargando...</div>;
  }

  if (error) {
    return <div className="list-component error-message">{error}</div>;
  }

  const renderItemDetails = (item) => {
    switch (type) {
      case 'restaurants':
        return (
          <>
            <h3>{item.name}</h3>
            <div className="item-info">
              <p><strong>Capacidad:</strong> {item.capacity}</p>
              <p><strong>Zonas:</strong> {item.zones ? JSON.stringify(item.zones) : 'No definidas'}</p>
              <p><strong>Estado:</strong> {item.status}</p>
              <p><strong>Activo:</strong> {item.isActive ? 'Sí' : 'No'}</p>
            </div>
          </>
        );
      // Añade más casos según necesites para otros tipos
      default:
        return <p>{JSON.stringify(item)}</p>;
    }
  };

  return (
    <div className="list-component">
      <div className="header">
        <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <button onClick={handleAddNew} className="btn-primary">Add New</button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>No hay {type} disponibles.</p>
          <p>Haz clic en "Add New" para añadir uno nuevo.</p>
        </div>
      ) : (
        <div className="items-list">
          {items.map(item => (
            <div key={item.id_restaurant || item.id} className="list-item">
              <div className="item-details">
                {renderItemDetails(item)}
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(item.id_restaurant || item.id)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(item.id_restaurant || item.id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListComponent;
