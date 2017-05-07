import axios, {AxiosPromise} from 'axios';
import qs from 'qs';

interface QueryParams {
  // Query term
  query?: string;

  // Order of results
  orderBy?: string;
  order?: string;

  offset?: number;
  limit?: number;
}

interface PastaIndex {
  total_count: number;
  pastas: {
    id: string,
    title: string,
    type: string,
    updated_at: string
  }[];
}

/**
 * Fetches index of pastas
 * @param queryParams - Query parameters
 * @returns {AxiosPromise}
 */
export function fetchPastaIndex(queryParams: QueryParams): Promise<PastaIndex> {
  const baseUrl = '/api/pastas';
  const querystring = qs.stringify(queryParams);
  return axios.get(baseUrl + '?' + querystring)
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

/**
 * Deletes pasta
 * @param id - Pasta's ID
 * @returns {AxiosPromise}
 */
export function deletePasta(id: string) {
  return axios.delete(`/api/pastas/${id}`);
}
