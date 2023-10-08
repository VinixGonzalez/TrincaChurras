export interface Pessoa {
  id: string;
  pago: boolean;
  nome: string;
  valor: number;
}

export interface Churras {
  nome: string;
  bebidaInclusa: boolean;
  lista: Pessoa[];
  total: number;
  id: number;
  data: string;
  endereco: string;
}
