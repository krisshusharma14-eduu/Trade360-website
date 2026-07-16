import { useState, useEffect } from 'react';

export interface Service {
  id: number | string;
  title: string;
  description: string;
}

interface StrapiServiceItem {
  id: number;
  documentId?: string;
  Text?: string;
  Text1?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

interface StrapiResponse {
  data: StrapiServiceItem[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchServices() {
      // Read the Strapi base URL from the environment variable.
      // Vite clients prefix env vars with VITE_
      const baseUrl = (import.meta as any).env?.VITE_STRAPI_API_URL || '';
      
      // Construct full URL to point to /api/services if only base is provided.
      let url = '';
      if (baseUrl) {
        url = baseUrl.endsWith('/api/services') ? baseUrl : `${baseUrl}/api/services`;
      } else {
        url = '/api/services';
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json: StrapiResponse = await response.json();
        
        if (isMounted) {
          if (json && Array.isArray(json.data)) {
            const mapped: Service[] = json.data.map((item) => ({
              id: item.id || item.documentId || Math.random().toString(),
              title: item.Text || 'Untitled Service',
              description: item.Text1 || 'No description provided.',
            }));
            setServices(mapped);
          } else {
            throw new Error('Invalid response format from Strapi backend');
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch services from Strapi:', err);
          setError(err.message || 'Failed to fetch services');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchServices();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { services, loading, error };
}
