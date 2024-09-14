import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  stockLevel: number;
  dealerId: number;
}

const API_URL = 'http://localhost:8080/api/Cars';

const CarList: React.FC = () => {
  const [dealerId, setDealerId] = useState(1);
  const queryClient = useQueryClient();

  const { data: cars, isLoading, isError } = useQuery<Car[]>({
    queryKey: ['cars', dealerId],
    queryFn: () => axios.get(`${API_URL}?dealerId=${dealerId}`).then(res => res.data),
  });

  const addCarMutation = useMutation({
  mutationFn: (newCar: Omit<Car, 'id'>) => axios.post(API_URL, newCar, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cars'] }),
});

  const [newCar, setNewCar] = useState<Omit<Car, 'id'>>({
    make: '',
    model: '',
    year: 2023,
    stockLevel: 1,
    dealerId: dealerId,
  });

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    const carToAdd = {
      ...newCar,
      year: Number(newCar.year),
      stockLevel: Number(newCar.stockLevel),
      dealerId: Number(dealerId)
    };
    addCarMutation.mutate(carToAdd);
    setNewCar({ make: '', model: '', year: 2023, stockLevel: 1, dealerId: dealerId });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching cars</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Car Inventory</h1>
      <div className="mb-4">
        <label htmlFor="dealerId" className="mr-2">Dealer ID:</label>
        <input
          type="number"
          id="dealerId"
          value={dealerId}
          onChange={(e) => setDealerId(Number(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
      <form onSubmit={handleAddCar} className="mb-4">
        <input
            type="text"
            placeholder="Make"
            value={newCar.make}
            onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
            className="border rounded px-2 py-1 mr-2"
        />
        <input
            type="text"
            placeholder="Model"
            value={newCar.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            className="border rounded px-2 py-1 mr-2"
        />
        <input
            type="number"
            placeholder="Year"
            value={newCar.year}
            onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) })}
            className="border rounded px-2 py-1 mr-2"
        />
        <input
            type="number"
            placeholder="Stock Level"
            value={newCar.stockLevel}
            onChange={(e) => setNewCar({ ...newCar, stockLevel: Number(e.target.value) })}
            className="border rounded px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Car</button>
        </form>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars?.map((car) => (
          <li key={car.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{car.make} {car.model}</h2>
            <p>Year: {car.year}</p>
            <p>Stock: {car.stockLevel}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;