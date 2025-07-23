import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface Strawberry {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface DecodedToken {
  role: string;
}

const StrawberryList: React.FC = () => {
  const [strawberries, setStrawberries] = useState<Strawberry[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserRole(decodedToken.role);
    }

    axios.get('http://localhost:3001/strawberries')
      .then(response => {
        setStrawberries(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the strawberries!', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/strawberries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStrawberries(strawberries.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to delete strawberry', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Strawberry Varieties</h2>
      {userRole === 'admin' && (
        <Link to="/strawberries/new" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
          Add New Strawberry
        </Link>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strawberries.map(strawberry => (
          <div key={strawberry.id} className="border rounded-lg p-4">
            <img src={strawberry.imageUrl} alt={strawberry.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{strawberry.name}</h3>
              <p className="text-gray-700">{strawberry.description}</p>
              <Link to={`/strawberries/${strawberry.id}`} className="text-red-500 hover:text-red-700 mt-2 inline-block">
                Learn More
              </Link>
              {userRole === 'admin' && (
                <div className="mt-4">
                  <Link to={`/strawberries/edit/${strawberry.id}`} className="text-blue-500 hover:text-blue-700 mr-4">Edit</Link>
                  <button onClick={() => handleDelete(strawberry.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrawberryList;
