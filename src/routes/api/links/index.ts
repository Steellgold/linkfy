export interface ILink {
  userId?: string;
  visitorId: string;
  baseUrl: string;
  shortUrl: string;
  clicks: number;
  countries: Record<string, number>;
  browsers: Record<string, number>;
  platforms: Record<string, number>;
  status: boolean;
}