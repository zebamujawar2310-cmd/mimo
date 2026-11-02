"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  generateGuests, generateReservations, generateRooms, INITIAL_BILLS,
  INITIAL_HOUSEKEEPING, INITIAL_REVIEWS, INITIAL_WELCOME_DRINKS,
} from "@/lib/data";
import type { Bill, Guest, HousekeepingTask, Reservation, Room, WelcomeDrink, Review, Notification } from "@/lib/types";

type HotelContextType = {
  rooms: Room[]; guests: Guest[]; reservations: Reservation[]; bills: Bill[];
  reviews: readonly Review[]; housekeeping: HousekeepingTask[]; welcomeDrinks: WelcomeDrink[];
  notifications: Notification[];
  setRooms: (rooms: Room[]) => void; setGuests: (guests: Guest[]) => void;
  updateRoomStatus: (id: string, status: Room["status"]) => void;
  addGuest: (guest: Omit<Guest, "id">) => void; updateGuest: (id: string, data: Partial<Guest>) => void;
  createReservation: (reservation: Omit<Reservation, "id">) => void;
  updateReservation: (id: string, data: Partial<Reservation>) => void;
  updateReservationStatus: (id: string, status: Reservation["status"]) => void;
  addBill: (bill: Omit<Bill, "id">) => void; updateBill: (id: string, data: Partial<Bill>) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void; clearNotifications: () => void;
  updateHousekeepingTask: (id: string, data: Partial<HousekeepingTask>) => void;
  createHousekeepingTask: (roomNumber: string) => void;
  updateWelcomeDrink: (id: string, data: { drink?: string | null; status: WelcomeDrink["status"]; guestName?: string; roomNumber?: string }) => void;
  resetDemoData: () => void;
};
const KEY = "arfa-hotel-demo";
const HotelContext = createContext<HotelContextType | undefined>(undefined);

function read<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(KEY + "-" + key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
}
function persist(key: string, value: unknown) {
  try { localStorage.setItem(KEY + "-" + key, JSON.stringify(value)); } catch { /* storage may be unavailable */ }
}

export function HotelProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(() => generateRooms());
  const [guests, setGuests] = useState<Guest[]>(() => generateGuests());
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [bills, setBills] = useState<Bill[]>(INITIAL_BILLS);
  const [reviews] = useState<readonly Review[]>(INITIAL_REVIEWS);
  const [housekeeping, setHousekeeping] = useState<HousekeepingTask[]>(INITIAL_HOUSEKEEPING);
  const [welcomeDrinks, setWelcomeDrinks] = useState<WelcomeDrink[]>(INITIAL_WELCOME_DRINKS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedGuests = read("guests", generateGuests());
    setGuests(savedGuests);
    const savedRooms = read<Room[] | null>("rooms", null);
    const loadedReservations = read("reservations", generateReservations(savedGuests));
    const initialRooms = savedRooms || generateRooms().map((room) => {
      const reservation = loadedReservations.find((r) => r.roomNumber === room.number && ["confirmed", "pending", "checked-in"].includes(r.status));
      return reservation ? { ...room, status: reservation.status === "checked-in" ? "occupied" as const : "booked" as const, guestName: reservation.guestName, checkIn: reservation.checkIn, checkOut: reservation.checkOut } : room;
    });
    setRooms(initialRooms);
    setReservations(loadedReservations);
    setBills(read("bills", INITIAL_BILLS));
    setHousekeeping(read("housekeeping", INITIAL_HOUSEKEEPING));
    setWelcomeDrinks(read("welcomeDrinks", INITIAL_WELCOME_DRINKS));
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    persist("rooms", rooms); persist("guests", guests); persist("reservations", reservations);
    persist("bills", bills); persist("housekeeping", housekeeping); persist("welcomeDrinks", welcomeDrinks);
  }, [ready, rooms, guests, reservations, bills, housekeeping, welcomeDrinks]);

  const addNotification = useCallback((n: Omit<Notification, "id" | "timestamp" | "read">) => {
    setNotifications((p) => [{ ...n, id: "notif-" + Date.now(), timestamp: new Date().toISOString(), read: false }, ...p].slice(0, 50));
  }, []);
  const updateRoomStatus = useCallback((id: string, status: Room["status"]) => {
    setRooms((p) => p.map((r) => r.id === id ? { ...r, status } : r));
  }, []);
  const addGuest = useCallback((g: Omit<Guest, "id">) => setGuests((p) => [...p, { ...g, id: "guest-" + Date.now() }]), []);
  const updateGuest = useCallback((id: string, data: Partial<Guest>) => setGuests((p) => p.map((g) => g.id === id ? { ...g, ...data } : g)), []);
  const createReservation = useCallback((r: Omit<Reservation, "id">) => {
    setReservations((p) => [...p, { ...r, id: "res-" + Date.now() }]);
    setRooms((p) => p.map((room) => room.number === r.roomNumber ? { ...room, status: "booked", guestName: r.guestName, checkIn: r.checkIn, checkOut: r.checkOut } : room));
  }, []);
  const updateReservation = useCallback((id: string, data: Partial<Reservation>) => setReservations((p) => p.map((r) => r.id === id ? { ...r, ...data } : r)), []);
  const updateReservationStatus = useCallback((id: string, status: Reservation["status"]) => setReservations((p) => p.map((r) => r.id === id ? { ...r, status } : r)), []);
  const addBill = useCallback((bill: Omit<Bill, "id">) => setBills((p) => [...p, { ...bill, id: "bill-" + Date.now() }]), []);
  const updateBill = useCallback((id: string, data: Partial<Bill>) => setBills((p) => p.map((b) => b.id === id ? { ...b, ...data } : b)), []);
  const markNotificationRead = useCallback((id: string) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n)), []);
  const clearNotifications = useCallback(() => setNotifications([]), []);
  const updateHousekeepingTask = useCallback((id: string, data: Partial<HousekeepingTask>) => setHousekeeping((p) => p.map((t) => t.id === id ? { ...t, ...data, updatedAt: new Date().toLocaleString() } : t)), []);
  const createHousekeepingTask = useCallback((roomNumber: string) => setHousekeeping((p) => {
    if (p.some((t) => t.roomNumber === roomNumber && t.status !== "completed")) return p;
    return [...p, { id: "hk-" + Date.now(), roomNumber, status: "pending", assignedTo: "Unassigned", priority: "medium", notes: "Departure clean", updatedAt: new Date().toLocaleString() }];
  }), []);
  const updateWelcomeDrink = useCallback((id: string, data: { drink?: string | null; status: WelcomeDrink["status"]; guestName?: string; roomNumber?: string }) => {
    setWelcomeDrinks((p) => {
      const found = p.some((x) => x.id === id);
      if (!found) return [...p, { id, guestName: data.guestName || "", roomNumber: data.roomNumber || "", drink: data.drink ?? null, status: data.status, requestedAt: new Date().toISOString(), servedAt: data.status === "served" ? new Date().toISOString() : null }];
      return p.map((w) => w.id === id ? { ...w, ...data, servedAt: data.status === "served" ? new Date().toISOString() : w.servedAt } : w);
    });
  }, []);
  const resetDemoData = useCallback(() => {
    const freshGuests = generateGuests();
    setRooms(generateRooms()); setGuests(freshGuests); setReservations(generateReservations(freshGuests));
    setBills(INITIAL_BILLS); setHousekeeping(INITIAL_HOUSEKEEPING); setWelcomeDrinks(INITIAL_WELCOME_DRINKS); setNotifications([]);
  }, []);

  const value = useMemo(() => ({
    rooms, guests, reservations, bills, reviews, housekeeping, welcomeDrinks, notifications,
    setRooms, setGuests, updateRoomStatus, addGuest, updateGuest, createReservation,
    updateReservation, updateReservationStatus, addBill, updateBill, addNotification, markNotificationRead,
    clearNotifications, updateHousekeepingTask, createHousekeepingTask, updateWelcomeDrink, resetDemoData,
  }), [rooms, guests, reservations, bills, reviews, housekeeping, welcomeDrinks, notifications,
    updateRoomStatus, addGuest, updateGuest, createReservation, updateReservation, updateReservationStatus,
    addBill, updateBill, addNotification, markNotificationRead, clearNotifications,
    updateHousekeepingTask, createHousekeepingTask, updateWelcomeDrink, resetDemoData]);
  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
}

export function useHotel() {
  const value = useContext(HotelContext);
  if (!value) throw new Error("useHotel must be used within HotelProvider");
  return value;
}
