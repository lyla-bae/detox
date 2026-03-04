import { create } from "zustand";

export interface SubscriptionItem {
  id: number;
  href: string;
  name: string;
  price?: number;
  billingCycle: "월간결제" | "연간결제";
  badgeLabel: string;
  badgeVariant: "primary" | "danger";
  group?: boolean;
  groupCount?: number;
  imageSrc?: string;
  imageAlt?: string;
  trialLabel?: string;
}

interface SubscriptionStoreState {
  hasSubscription: boolean;
  setHasSubscription: (value: boolean) => void;
  list: SubscriptionItem[];
  setList: (items: SubscriptionItem[]) => void;
  clear: () => void;
}

export const useSubscriptionStore = create<SubscriptionStoreState>((set) => ({
  hasSubscription: false,
  list: [],
  setHasSubscription: (value) => set({ hasSubscription: value }),
  setList: (items) => set({ list: items }),
  clear: () => set({ hasSubscription: false, list: [] }),
}));
