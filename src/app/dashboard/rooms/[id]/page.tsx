"use client";
import { useParams } from "next/navigation";
import { useHotel } from "@/context/HotelContext";
import { ManagementWorkspace } from "@/components/hotel/ManagementWorkspace";
import { BedDouble } from "lucide-react";
export default function RoomDetailPage() {
  const params = useParams<{ id: string }>();
  const room = useHotel().rooms.find((item) => item.id === params.id);
  if (!room) return <ManagementWorkspace section="rooms" />;
  return <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-8 dark:border-white/10 dark:bg-[#171815]"><p className="text-xs uppercase tracking-[.2em] text-stone-400">ARFA · Room details</p><div className="mt-4 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#c8a967]/15 text-[#94783f]"><BedDouble/></span><div><h1 className="font-serif text-3xl">Room {room.number}</h1><p className="text-sm text-stone-500">{room.type} · floor {room.floor}</p></div></div><p className="mt-6 text-sm">Current status: {room.status}. Nightly rate: $${room.price}.</p><a className="mt-6 inline-block text-sm text-[#94783f] underline" href="/dashboard/rooms">Back to rooms</a></div>;
}
