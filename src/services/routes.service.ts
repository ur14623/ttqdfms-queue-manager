import { apiClient } from '@/lib/api-client';

export interface Route {
  id: number;
  name: string;
  distance: string;
  price_per_passenger: string;
  start_location: string;
  end_location: string;
  is_active: boolean;
  driver_count: number;
  trip_count: number;
  total_revenue: number;
  queue_count: number;
  created_at: string;
  updated_at: string;
}

export interface RouteListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Route[];
}

export interface CreateRoutePayload {
  name: string;
  distance: string;
  price_per_passenger: string;
  start_location: string;
  end_location: string;
  is_active: boolean;
}

export interface UpdateRoutePayload extends CreateRoutePayload {}

export interface RouteDetailResponse {
  route: Route;
  assigned_drivers: unknown[];
  recent_trips: unknown[];
  stats: {
    total_drivers: number;
    total_trips: number;
    total_revenue: number;
  };
}

export const routesService = {
  async getRoutes(): Promise<RouteListResponse> {
    return apiClient.get<RouteListResponse>('/routes/');
  },

  async getRouteDetail(id: number): Promise<RouteDetailResponse> {
    return apiClient.get<RouteDetailResponse>(`/routes/${id}/detail/`);
  },

  async createRoute(data: CreateRoutePayload): Promise<Route> {
    return apiClient.post<Route>('/routes/', data);
  },

  async updateRoute(id: number, data: UpdateRoutePayload): Promise<Route> {
    return apiClient.put<Route>(`/routes/${id}/`, data);
  },

  async deleteRoute(id: number): Promise<void> {
    return apiClient.delete<void>(`/routes/${id}/`);
  },

  async getRouteTrips(routeId: number, filters?: {
    driver_id?: number;
    vehicle_id?: number;
    status?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<unknown> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
    }
    const queryString = params.toString();
    return apiClient.get(`/routes/${routeId}/trips/${queryString ? `?${queryString}` : ''}`);
  },
};
