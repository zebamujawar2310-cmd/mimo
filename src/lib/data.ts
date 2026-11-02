import type {
  Room,
  Guest,
  Reservation,
  Bill,
  Review,
  HousekeepingTask,
  WelcomeDrink,
  DashboardStats,
  RoomType,
  RoomStatus,
  GuestStatus,
  ReservationStatus,
} from "./types";

const ROOM_TYPES: RoomType[] = ["Single", "Double", "Deluxe", "Suite", "Presidential Suite"];
const ROOM_PRICES: Record<RoomType, number> = {
  Single: 120,
  Double: 180,
  Deluxe: 280,
  Suite: 450,
  "Presidential Suite": 850,
};
const AMENITIES: Record<RoomType, string[]> = {
  Single: ["Wi-Fi", "TV", "Coffee/Tea"],
  Double: ["Wi-Fi", "TV", "Mini-bar", "Coffee/Tea"],
  Deluxe: ["Wi-Fi", "TV", "Mini-bar", "Nespresso", "Bathrobe", "City view"],
  Suite: ["Wi-Fi", "TV", "Mini-bar", "Nespresso", "Bathrobe", "Separate living area", "City view"],
  "Presidential Suite": ["Wi-Fi", "TV", "Mini-bar", "Nespresso", "Bathrobe", "Separate living area", "Skyline view", "Butler service"],
};

export function generateRooms(count = 36): Room[] {
  const rooms: Room[] = [];
  const statuses: RoomStatus[] = ["available", "available", "available", "booked", "occupied", "dirty", "cleaning"];
  for (let i = 1; i <= count; i++) {
    const floor = Math.ceil(i / 9);
    const type = ROOM_TYPES[(i - 1) % ROOM_TYPES.length];
    const price = ROOM_PRICES[type];
    const status = statuses[(i - 1) % statuses.length];
    rooms.push({
      id: `room-${i}`,
      number: `${floor}0${i % 9 === 0 ? 9 : i % 9}`,
      type,
      status,
      price,
      floor,
      capacity: type === "Single" ? 1 : type === "Double" ? 2 : type === "Deluxe" ? 3 : 4,
      guestName: status === "occupied" || status === "booked" ? `Guest ${i}` : null,
      checkIn: status === "occupied" ? "2026-10-24" : null,
      checkOut: status === "occupied" ? "2026-10-26" : null,
      dirtySince: status === "dirty" ? "2026-10-25T08:00:00" : null,
      amenities: AMENITIES[type],
      image: null,
    });
  }
  return rooms;
}

const FIRST_NAMES = ["James", "Emma", "Michael", "Olivia", "William", "Ava", "Benjamin", "Sophia", "Lucas", "Mia", "Alexander", "Isabella"];
const LAST_NAMES = ["Hartwell", "Prescott", "Sterling", "Kensington", "Montclair", "Winslow", "Ashford", "Blackwood", "Fairchild", "Hawthorne"];
const EMAIL_DOMAINS = ["gmail.com", "outlook.com", "yahoo.com"];

export function generateGuests(count = 24): Guest[] {
  const guests: Guest[] = [];
  const statuses: GuestStatus[] = ["in-house", "checked-out", "reserved", "checked-out"];
  for (let i = 1; i <= count; i++) {
    const fn = FIRST_NAMES[(i - 1) % FIRST_NAMES.length];
    const ln = LAST_NAMES[(i - 1) % LAST_NAMES.length];
    const status = statuses[(i - 1) % statuses.length];
    guests.push({
      id: `guest-${i}`,
      firstName: fn,
      lastName: ln,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@${EMAIL_DOMAINS[i % EMAIL_DOMAINS.length]}`,
      phone: `+1 (555) ${String(200 + i).padStart(3, "0")}-${String(1000 + i * 7).padStart(4, "0")}`,
      address: `${100 + i} Maple Avenue, Suite ${i}`,
      idNumber: `ID-${String(10000 + i).padStart(6, "0")}`,
      status,
      totalSpent: 750 + i * 183,
      visits: 1 + (i % 9),
      lastStay: status === "checked-out" ? "2026-09-15" : null,
      preferences: status === "in-house" ? ["Quiet room", "Extra pillows"] : [],
      image: null,
    });
  }
  return guests;
}

export function generateReservations(guests: Guest[]): Reservation[] {
  const statuses: ReservationStatus[] = ["confirmed", "checked-in", "checked-out", "pending"];
  return guests.slice(0, 14).map((g, i) => {
    const status = statuses[i % statuses.length];
    const nights = 1 + (i % 4);
    const arrivalDay = status === "checked-in" || status === "checked-out" ? 26 - nights : 26 + i;
    const arrival = new Date(Date.UTC(2026, 9, arrivalDay));
    const departure = new Date(Date.UTC(2026, 9, arrivalDay + nights));
    const roomNumber = i < 9 ? `30${i + 1}` : `40${i - 8}`;
    const roomType = ROOM_TYPES[i < 9 ? (18 + i) % ROOM_TYPES.length : (27 + i - 9) % ROOM_TYPES.length];
    const total = ROOM_PRICES[roomType] * nights;
    return {
      id: `res-${i + 1}`,
      guestId: g.id,
      guestName: `${g.firstName} ${g.lastName}`,
      roomNumber,
      roomType,
      checkIn: arrival.toISOString().slice(0, 10),
      checkOut: departure.toISOString().slice(0, 10),
      nights,
      status,
      total,
      paid: status === "checked-out" ? total : status === "checked-in" ? Math.round(total * 0.6) : 0,
      paymentMethod: status === "checked-out" ? "Credit Card" : null,
    };
  });
}

export const INITIAL_BILLS: Bill[] = [];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "review-1",
    guestName: "Eleanor Whitmore",
    rating: 5,
    comment: "An exquisite stay from start to finish. The suite was immaculate and the staff anticipated every need.",
    date: "2026-10-20",
    avatar: null,
    verified: true,
  },
  {
    id: "review-2",
    guestName: "Julian M. Hart",
    rating: 4,
    comment: "Beautiful property with a warm, refined atmosphere. The welcome drink was a lovely touch.",
    date: "2026-10-18",
    avatar: null,
    verified: true,
  },
  {
    id: "review-3",
    guestName: "Isabelle Leroux",
    rating: 5,
    comment: "Luxurious, peaceful, and impeccably managed. Will certainly return.",
    date: "2026-10-15",
    avatar: null,
    verified: false,
  },
  {
    id: "review-4",
    guestName: "Robert K. Vance",
    rating: 3,
    comment: "Elegant surroundings, though check-in took longer than expected.",
    date: "2026-10-10",
    avatar: null,
    verified: true,
  },
];

export const INITIAL_HOUSEKEEPING: HousekeepingTask[] = [
  { id: "hk-1", roomNumber: "301", status: "completed", assignedTo: "Maria S.", priority: "high", notes: "Standard turn-down", updatedAt: "2026-10-25 10:15" },
  { id: "hk-2", roomNumber: "302", status: "in-progress", assignedTo: "James L.", priority: "medium", notes: "Deep clean", updatedAt: "2026-10-25 10:40" },
  { id: "hk-3", roomNumber: "304", status: "pending", assignedTo: "Aisha R.", priority: "high", notes: "Departure clean", updatedAt: "2026-10-25 09:00" },
  { id: "hk-4", roomNumber: "307", status: "pending", assignedTo: "Maria S.", priority: "medium", notes: "Refresh linen", updatedAt: "2026-10-25 11:00" },
  { id: "hk-5", roomNumber: "401", status: "completed", assignedTo: "James L.", priority: "low", notes: "Turndown service", updatedAt: "2026-10-24 18:30" },
];

export const INITIAL_WELCOME_DRINKS: WelcomeDrink[] = [
  { id: "wd-1", guestName: "James Hartwell", roomNumber: "301", drink: "Champagne", status: "served", requestedAt: "2026-10-24 14:00", servedAt: "2026-10-24 14:15" },
  { id: "wd-2", guestName: "Emma Prescott", roomNumber: "302", drink: "Fresh Orange Juice", status: "pending", requestedAt: "2026-10-24 15:30" },
  { id: "wd-3", guestName: "Michael Sterling", roomNumber: "304", drink: null, status: "declined", requestedAt: "2026-10-24 16:00" },
];

export function computeDashboardStats(rooms: Room[], reservations: Reservation[]): DashboardStats {
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r) => r.status === "available").length;
  const bookedRooms = rooms.filter((r) => r.status === "booked").length;
  const occupiedRooms = rooms.filter((r) => r.status === "occupied").length;
  const dirtyRooms = rooms.filter((r) => r.status === "dirty").length;
  const checkIns = reservations.filter((r) => r.status === "checked-in").length;
  const checkOuts = reservations.filter((r) => r.status === "checked-out").length;
  const revenue = reservations.reduce((sum, r) => sum + r.paid, 0);
  const occupancyRate = totalRooms > 0 ? Math.round(((bookedRooms + occupiedRooms) / totalRooms) * 100) : 0;
  return { totalRooms, availableRooms, bookedRooms, occupiedRooms, dirtyRooms, checkIns, checkOuts, revenue, occupancyRate };
}

