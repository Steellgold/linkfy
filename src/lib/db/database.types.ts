export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Link: {
        Row: {
          clicks: number;
          createdAt: string | null;
          disabled: boolean | null;
          expireAt: number | null;
          maxUses: number | null;
          password: string | null;
          slug: string;
          subdomain: string | null;
          url: string;
          userId: string | null;
        };
        Insert: {
          clicks?: number;
          createdAt?: string | null;
          disabled?: boolean | null;
          expireAt?: number | null;
          maxUses?: number | null;
          password?: string | null;
          slug: string;
          subdomain?: string | null;
          url: string;
          userId?: string | null;
        };
        Update: {
          clicks?: number;
          createdAt?: string | null;
          disabled?: boolean | null;
          expireAt?: number | null;
          maxUses?: number | null;
          password?: string | null;
          slug?: string;
          subdomain?: string | null;
          url?: string;
          userId?: string | null;
        };
        Relationships: [];
      };
      Subdomain: {
        Row: {
          createdAt: string | null;
          isPaid: boolean;
          name: string;
          userId: string;
        };
        Insert: {
          createdAt?: string | null;
          isPaid?: boolean;
          name: string;
          userId: string;
        };
        Update: {
          createdAt?: string | null;
          isPaid?: boolean;
          name?: string;
          userId?: string;
        };
        Relationships: [];
      };
      User: {
        Row: {
          apiKey: string;
          apiKeyLast: string | null;
          apiKeyUsages: Json | null;
          createdAt: string | null;
          email: string;
          id: string;
          isPaid: boolean;
        };
        Insert: {
          apiKey: string;
          apiKeyLast?: string | null;
          apiKeyUsages?: Json | null;
          createdAt?: string | null;
          email: string;
          id: string;
          isPaid?: boolean;
        };
        Update: {
          apiKey?: string;
          apiKeyLast?: string | null;
          apiKeyUsages?: Json | null;
          createdAt?: string | null;
          email?: string;
          id?: string;
          isPaid?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
}