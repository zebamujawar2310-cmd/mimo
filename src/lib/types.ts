export type RoomStatus = "available" | "booked" | "occupied" | "dirty" | "cleaning" | "maintenance";
export type RoomType = "Single" | "Double" | "Deluxe" | "Suite" | "Presidential Suite";
export type GuestStatus = "in-house" | "checked-out" | "reserved" | "no-show";
export type ReservationStatus = "confirmed" | "checked-in" | "checked-out" | "cancelled" | "pending";
export type BillStatus = "unpaid" | "partial" | "paid";
export type Theme = "light" | "dark" | "system";
export type NotificationType = "success" | "error" | "warning" | "info";
export type TaskStatus = "pending" | "in-progress" | "completed";
export type DrinkStatus = "pending" | "served" | "declined";

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  price: number;
  floor: number;
  capacity: number;
  guestName?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  dirtySince?: string | null;
  amenities?: string[];
  image?: string | null;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string | null;
  idNumber?: string | null;
  status: GuestStatus;
  totalSpent: number;
  visits: number;
  lastStay?: string | null;
  preferences?: string[];
  image?: string | null;
}

export interface Reservation {
  id: string;
  guestId: string;
  guestName: string;
  roomNumber: string;
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: ReservationStatus;
  total: number;
  paid: number;
  paymentMethod?: string | null;
}

export interface BillLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  category: "room" | "food" | "service" | "tax" | "discount" | "other";
}

export interface Bill {
  id: string;
  reservationId: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomRate: number;
  roomAmount: number;
  lineItems: BillLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  paid: number;
  balance: number;
  status: BillStatus;
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string | null;
  verified: boolean;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  status: TaskStatus;
  assignedTo: string;
  priority: "low" | "medium" | "high";
  notes?: string | null;
  updatedAt: string;
}

export interface WelcomeDrink {
  id: string;
  guestName: string;
  roomNumber: string;
  drink: string | null;
  status: DrinkStatus;
  requestedAt: string;
  servedAt?: string | null;
}

export interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
  occupiedRooms: number;
  dirtyRooms: number;
  checkIns: number;
  checkOuts: number;
  revenue: number;
  occupancyRate: number;
}

export interface OccupancyPoint {
  date: string;
  occupancy: number;
  revenue: number;
}
