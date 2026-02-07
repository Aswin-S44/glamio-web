export interface CreateServicePayload {
  name: string;
  imageUrl: string;
  rate: number;
  category: string;
  description?: string;
  duration?: string;
}
