export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  equipments: Equipment[];
}

export interface Equipment {
  id: string;
  name: string;
  price: number;
}
