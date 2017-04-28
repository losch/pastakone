import axios, {AxiosPromise} from 'axios';

/**
 * Fetches index of pastas
 * @param query - Title field query
 * @returns {AxiosPromise}
 */
export function fetchPastaIndex(query?: string): AxiosPromise {
  const url = query ? `/api/pastas?query=${query}`:
                      '/api/pastas';
  return axios.get(url)
              .then(response => response.data);
}

/**
 * Fetches single pasta's contents
 * @param id - Pasta's ID
 * @returns {AxiosPromise}
 */
export function fetchPasta(id: string): AxiosPromise {
  return axios.get(`/api/pastas/${id}`);
}

interface PastaParams {
  title: string;
  type: string;
  contents: string;
}

/**
 * Creates new pasta
 * @param pasta
 * @returns {AxiosPromise}
 */
export function createPasta(pasta: PastaParams) {
  return axios.post('/api/pastas', {pasta: pasta});
}

/**
 * Updates existing pasta
 * @param id - Pasta's ID
 * @param pasta
 * @returns {AxiosPromise}
 */
export function updatePasta(id: string, pasta: PastaParams) {
  return axios.patch(`/api/pastas/${id}`, {pasta: pasta});
}
