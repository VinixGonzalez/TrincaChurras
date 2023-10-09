export interface Pessoa {
  id: string;
  pago: boolean;
  nome: string;
  valor: string | number;
}

export interface Churras {
  nome: string;
  bebidaInclusa: boolean;
  lista: Pessoa[];
  observacoes: string;
  total: number;
  id: string;
  data: string | Date;
  endereco: string;
}
