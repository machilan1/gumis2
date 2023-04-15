export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  image: string;
  equipments?: Equipment[];
}

export interface Equipment {
  id: string;
  name: string;
  price: number;
}
