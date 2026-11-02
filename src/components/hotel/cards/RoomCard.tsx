"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Room } from "@/lib/types";

const STATUS_CONFIG: Record<Room["status"], { label: string; className: string }> = {
  available: { label: "Available", className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800" },
  booked: { label: "Booked", className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800" },
  occupied: { label: "Occupied", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" },
  dirty: { label: "Dirty", className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800" },
  cleaning: { label: "Cleaning", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" },
  maintenance: { label: "Maintenance", className: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800" },
};

interface RoomCardProps {
  room: Room;
  onStatusChange?: (roomId: string, status: Room["status"]) => void;
}

export function RoomCard({ room, onStatusChange }: RoomCardProps) {
  const status = STATUS_CONFIG[room.status];
  const statuses: Room["status"][] = ["available", "booked", "occupied", "dirty", "cleaning", "maintenance"];
  const currentIndex = statuses.indexOf(room.status);
  const nextStatus = statuses[(currentIndex + 1) % statuses.length];

  return (
    <Link
      href={`/dashboard/rooms/${room.id}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border bg-card p-4 text-foreground shadow-sm hover:shadow-md transition-all",
        room.status === "dirty" ? "border-rose-200 dark:border-rose-800" : ""
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room</p>
          <h3 className="text-xl font-serif font-bold">{room.number}</h3>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onStatusChange?.(room.id, nextStatus);
          }}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={`Change status for room ${room.number}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </button>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-serif text-foreground">{room.type}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${status.className}`}>{status.label}</span>
      </div>

      <div className="space-y-1 text-sm text-muted-foreground mb-4">
        <p className="flex items-center gap-1">€{room.price.toLocaleString()}<span className="text-xs font-normal opacity-70">/night</span></p>
        <p className="flex items-center gap-1">Capacity: {room.capacity}</p>
        <p className="flex items-center gap-1">Floor {room.floor}</p>
      </div>

      {room.guestName && (
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs font-medium">{room.guestName}</span>
          <span className="text-xs text-muted-foreground">{room.checkOut}</span>
        </div>
      )}
    </Link>
  );
}
