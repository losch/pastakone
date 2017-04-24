import axios, {AxiosPromise} from 'axios';

export function fetchPastaIndex(): AxiosPromise {
  return axios.get('/api/pastas').then(response => response.data);
}

export function fetchPasta(id: string): AxiosPromise {
  return axios.get(`/api/pastas/${id}`);
}

interface PastaParams {
  title: string;
  type: string;
  contents: string;
}

export function createPasta(pasta: PastaParams) {
  return axios.post('/api/pastas', {pasta: pasta});
}

export function updatePasta(id: string, pasta: PastaParams) {
  return axios.patch(`/api/pastas/${id}`, {pasta: pasta});
}
