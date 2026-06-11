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
      waitlist: {
        Row: {
          id: number
          name: string | null
          email: string
          phone: string | null
          dog_count: string | null
          city: string | null
          created_at: string
        }
        Insert: {
          name?: string | null
          email: string
          phone?: string | null
          dog_count?: string | null
          city?: string | null
          created_at?: string
        }
        Update: {
          name?: string | null
          email?: string
          phone?: string | null
          dog_count?: string | null
          city?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type WaitlistRow    = Database['public']['Tables']['waitlist']['Row']
export type WaitlistInsert = Database['public']['Tables']['waitlist']['Insert']
