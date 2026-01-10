// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface Organization {
  id: number;
  name: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  category?: string;
  logo_url?: string | null;
}

interface Plan {
  id: number;
  name: string;
  features_json: string;
}

interface CreateOrgPayload {
  name: string;
}

interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

export interface Child {
  id: number;
  first_name: string;
  last_name: string;
  birthdate: string;  // Full date in YYYY-MM-DD format
  gender?: string;
  notes?: string;
  emergency_contact_name: string;  // Required
  emergency_contact_email: string;  // Required
  emergency_contact_phone: string;  // Required
  is_participant?: boolean;
}

export type ChildResponse = Child;

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      // Build headers carefully: do NOT set Content-Type when sending FormData
      const incomingHeaders = (options.headers || {}) as Record<string, string>;
      const headers: Record<string, string> = { ...incomingHeaders };
      const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
      if (!isFormData) {
        headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';
      }

      const config: RequestInit = {
        ...options,
        headers,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        return { error: `HTTP ${response.status}: ${errorText}` };
      }

      // Handle 204 No Content responses (e.g., DELETE operations)
      if (response.status === 204) {
        return { data: { success: true } as T };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }

  // Health check
  async checkHealth(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/health');
  }

  // Get hello message
  async getHello(): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/api/hello');
  }

  // Get all plans
  async getPlans(): Promise<ApiResponse<Plan[]>> {
    return this.request<Plan[]>('/plans');
  }

  // Create organization
  async createOrganization(payload: CreateOrgPayload): Promise<ApiResponse<Organization>> {
    return this.request<Organization>('/orgs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Get organizations by admin email (query)
  async getOrganizationsByAdminEmail(email: string): Promise<ApiResponse<Organization[]>> {
    const encoded = encodeURIComponent(email);
    return this.request<Organization[]>(`/orgs?admin_email=${encoded}`);
  }

  // Update organization by ID
  async updateOrganization(id: number, payload: Partial<Organization>): Promise<ApiResponse<Organization>> {
    return this.request<Organization>(`/orgs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }

  // Get organization by ID
  async getOrganization(id: number): Promise<ApiResponse<Organization>> {
    return this.request<Organization>(`/orgs/${id}`);
  }

  // Get root endpoint
  async getRoot(): Promise<ApiResponse<{ ok: boolean; service: string }>> {
    return this.request<{ ok: boolean; service: string }>('/');
  }

  // Send contact email
  async sendContactEmail(payload: ContactEmailPayload): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return this.request<{ success: boolean; message: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // --- Child Management ---

  // Get all children for the authenticated user
  async getChildren(userId: string): Promise<ApiResponse<ChildResponse[]>> {
    return this.request<ChildResponse[]>(`/api/v1/children?user_id=${userId}`);
  }

  // Create a new child
  async createChild(userId: string, child: Omit<Child, 'id'>): Promise<ApiResponse<ChildResponse>> {
    return this.request<ChildResponse>(`/api/v1/children?user_id=${userId}`, {
      method: 'POST',
      body: JSON.stringify(child),
    });
  }

  // Update an existing child
  async updateChild(id: number, child: Partial<Child>): Promise<ApiResponse<ChildResponse>> {
    return this.request<ChildResponse>(`/api/v1/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(child),
    });
  }

  // Delete a child
  async deleteChild(id: number): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/api/v1/children/${id}`, {
      method: 'DELETE',
    });
  }
}

// Create and export API service instance
export const apiService = new ApiService(API_BASE_URL);

// --- Child Date Utility Functions ---

// Calculate age from birthdate (YYYY-MM-DD format)
export function calculateAge(birthdate: string): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Validate child age (must be under 18)
// NOTE: When child turns 18, behavior to be determined - discuss with management
export function validateChildAge(birthdate: string): { valid: boolean; message?: string } {
  const age = calculateAge(birthdate);
  if (age >= 18) {
    return { valid: false, message: "Child must be under 18 years old" };
  }
  return { valid: true };
}

// Export types for use in components
export type { Organization, Plan, CreateOrgPayload, ContactEmailPayload, ApiResponse };