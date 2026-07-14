export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          country_code: string | null
          dialing_code: string | null
          flag_url: string | null
          id: string
          name: string
        }
        Insert: {
          country_code?: string | null
          dialing_code?: string | null
          flag_url?: string | null
          id?: string
          name: string
        }
        Update: {
          country_code?: string | null
          dialing_code?: string | null
          flag_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          created_by: string | null
          dialing_code: string
          id: string
          is_active: boolean
          name: string
          phone: string
          subdomain: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          dialing_code?: string
          id?: string
          is_active?: boolean
          name: string
          phone?: string
          subdomain?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          dialing_code?: string
          id?: string
          is_active?: boolean
          name?: string
          phone?: string
          subdomain?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          id: string
          name: string | null
          organization_id: string
          phone: string | null
          role: Database["public"]["Enums"]["role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id: string
          name?: string | null
          organization_id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: string
          name?: string | null
          organization_id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          age: number
          city: string | null
          created_at: string
          created_by: string | null
          dialing_code: string
          gender: string
          id: string
          level: string
          name: string
          note: string | null
          organization_id: string
          phone: string
          status: Database["public"]["Enums"]["student_status"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          age: number
          city?: string | null
          created_at?: string
          created_by?: string | null
          dialing_code?: string
          gender: string
          id?: string
          level: string
          name: string
          note?: string | null
          organization_id: string
          phone: string
          status?: Database["public"]["Enums"]["student_status"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          age?: number
          city?: string | null
          created_at?: string
          created_by?: string | null
          dialing_code?: string
          gender?: string
          id?: string
          level?: string
          name?: string
          note?: string | null
          organization_id?: string
          phone?: string
          status?: Database["public"]["Enums"]["student_status"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_updated_by_fkey1"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          created_at: string
          created_by: string
          feedback: string | null
          id: string
          rating: number | null
          student_id: string
          updated_at: string | null
          updated_by: string | null
          updated_content_at: string | null
          updated_content_by: string | null
          visible: boolean
        }
        Insert: {
          created_at?: string
          created_by?: string
          feedback?: string | null
          id?: string
          rating?: number | null
          student_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_content_at?: string | null
          updated_content_by?: string | null
          visible?: boolean
        }
        Update: {
          created_at?: string
          created_by?: string
          feedback?: string | null
          id?: string
          rating?: number | null
          student_id?: string
          updated_at?: string | null
          updated_by?: string | null
          updated_content_at?: string | null
          updated_content_by?: string | null
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "student_testimonials"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "testimonials_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_updated_content_by_fkey"
            columns: ["updated_content_by"]
            isOneToOne: false
            referencedRelation: "student_testimonials"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "testimonials_updated_content_by_fkey"
            columns: ["updated_content_by"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      wc_countries: {
        Row: {
          code: string
          flag: string | null
          id: string
          name: string
        }
        Insert: {
          code?: string
          flag?: string | null
          id?: string
          name?: string
        }
        Update: {
          code?: string
          flag?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      wc_matches: {
        Row: {
          away_team_id: string
          created_at: string
          date: string | null
          home_team_id: string
          id: string
          result_first_team_to_score: string | null
          result_total_goals: number | null
          result_winner: string | null
          status: Database["public"]["Enums"]["wc_match_status"]
        }
        Insert: {
          away_team_id: string
          created_at?: string
          date?: string | null
          home_team_id: string
          id?: string
          result_first_team_to_score?: string | null
          result_total_goals?: number | null
          result_winner?: string | null
          status?: Database["public"]["Enums"]["wc_match_status"]
        }
        Update: {
          away_team_id?: string
          created_at?: string
          date?: string | null
          home_team_id?: string
          id?: string
          result_first_team_to_score?: string | null
          result_total_goals?: number | null
          result_winner?: string | null
          status?: Database["public"]["Enums"]["wc_match_status"]
        }
        Relationships: [
          {
            foreignKeyName: "wc_matches_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "wc_countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wc_matches_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "wc_countries"
            referencedColumns: ["id"]
          },
        ]
      }
      wc_players: {
        Row: {
          avatar_url: string | null
          id: string
          name: string
        }
        Insert: {
          avatar_url?: string | null
          id?: string
          name?: string
        }
        Update: {
          avatar_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      wc_predictions: {
        Row: {
          id: string
          match_id: string
          player_id: string
          predicted_first_team_to_score: string | null
          predicted_total_goals: number | null
          predicted_winner: string
          submitted_at: string
        }
        Insert: {
          id?: string
          match_id: string
          player_id: string
          predicted_first_team_to_score?: string | null
          predicted_total_goals?: number | null
          predicted_winner?: string
          submitted_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          player_id?: string
          predicted_first_team_to_score?: string | null
          predicted_total_goals?: number | null
          predicted_winner?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wc_predictions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "wc_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wc_predictions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "wc_leaderboard"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "wc_predictions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "wc_players"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      student_testimonials: {
        Row: {
          created_at: string | null
          created_by: string | null
          feedback: string | null
          gender: string | null
          name: string | null
          rating: number | null
          student_id: string | null
          testimonial_id: string | null
          updated_at: string | null
          updated_by: string | null
          updated_content_at: string | null
          updated_content_by: string | null
          visibility: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_updated_content_by_fkey"
            columns: ["updated_content_by"]
            isOneToOne: false
            referencedRelation: "student_testimonials"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "testimonials_updated_content_by_fkey"
            columns: ["updated_content_by"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      wc_leaderboard: {
        Row: {
          lose: number | null
          played: number | null
          player_id: string | null
          player_name: string | null
          points: number | null
          win: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      wc_get_all_matches: {
        Args: never
        Returns: {
          away_team: Database["public"]["Tables"]["wc_countries"]["Row"]
          away_team_id: string
          created_at: string
          date: string
          home_team: Database["public"]["Tables"]["wc_countries"]["Row"]
          home_team_id: string
          id: string
          result_first_throw_in: string
          result_first_team_to_score: string
          result_first_player_to_score: string
          result_score: string
          result_total_goals: number
          result_total_yellow_cards: number
          result_winner: string
          status: Database["public"]["Enums"]["wc_match_status"]
        }[]
      }
      wc_get_predictions_grouped_by_player: {
        Args: never
        Returns: {
          player_id: string
          player_name: string
          predictions: Database["public"]["CompositeTypes"]["wc_prediction_with_match"][]
        }[]
      }
    }
    Enums: {
      role: "owner" | "admin" | "teacher" | "staff"
      student_status: "active" | "completed" | "quit"
      wc_match_status: "upcoming" | "live" | "finished"
    }
    CompositeTypes: {
      wc_match_detail: {
        id: string | null
        date: string | null
        status: Database["public"]["Enums"]["wc_match_status"] | null
        result_winner: string | null
        result_total_goals: number | null
        home_team: Database["public"]["Tables"]["wc_countries"]["Row"] | null
        away_team: Database["public"]["Tables"]["wc_countries"]["Row"] | null
      }
      wc_prediction_with_match: {
        prediction_id: string | null
        predicted_winner: string | null
        predicted_winner_name: string | null
        predicted_total_goals: number | null
        match: Database["public"]["CompositeTypes"]["wc_match_detail"] | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      role: ["owner", "admin", "teacher", "staff"],
      student_status: ["active", "completed", "quit"],
      wc_match_status: ["upcoming", "live", "finished"],
    },
  },
} as const
