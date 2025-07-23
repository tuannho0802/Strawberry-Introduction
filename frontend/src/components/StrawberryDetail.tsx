import React, { useState, useEffect } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

interface Strawberry {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const StrawberryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [strawberry, setStrawberry] = useState<Strawberry | null>(null);

  useEffect(() => {
    api.get(`/strawberries/${id}`)
      .then(response => {
        setStrawberry(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the strawberry!', error);
      });
  }, [id]);

  if (!strawberry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{strawberry.name}</h2>
      <div className="flex flex-col md:flex-row">
        <img src={strawberry.imageUrl} alt={strawberry.name} className="w-full md:w-1/2 h-auto object-cover rounded-lg" />
        <div className="p-4">
          <p className="text-lg">{strawberry.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StrawberryDetail;
