import {
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import supabaseClient from "../SupabaseClient";
import { RoomResponse } from "../schemas";

export class RoomsFetcher {
  static async get() {
    const { data: rooms, error } = await supabaseClient
      .from("rooms")
      .select<"*", RoomResponse>("*");

    return { rooms, error };
  }

  static subscribe(
    callback: (e: RealtimePostgresChangesPayload<RoomResponse>) => void
  ) {
    return supabaseClient
      .channel("rooms")
      .on<RoomResponse>(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        callback
      )
      .subscribe();
  }
}
