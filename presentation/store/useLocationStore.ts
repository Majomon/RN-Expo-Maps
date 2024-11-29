import {
  getCurrentLocation,
  watchCurrentPosition,
} from "@/core/actions/location/location";
import { LatLng } from "@/infraestructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
  // Ultima ubicacion conocida del usuario
  lastKnownLocation: LatLng | null;
  userLocationList: LatLng[];
  watchSubscriptionID: LocationSubscription | null;

  getLocation: () => Promise<LatLng>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchSubscriptionID: null,

  // Para obtener la ubicación actual
  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnownLocation: location });

    return location;
  },

  // Para seguirlo
  watchLocation: async () => {
    const oldSubscription = get().watchSubscriptionID;
    if (oldSubscription !== null) {
      get().clearWatchLocation();
    }
    const watchSubscription = await watchCurrentPosition((latLng) => {
      set({
        lastKnownLocation: latLng,
        userLocationList: [...get().userLocationList, latLng],
      });
    });

    console.log(get().userLocationList);

    set({ watchSubscriptionID: watchSubscription });
  },

  // Para limpiar
  clearWatchLocation: () => {
    const subscription = get().watchSubscriptionID;

    if (subscription !== null) {
      subscription?.remove;
    }
  },
}));
