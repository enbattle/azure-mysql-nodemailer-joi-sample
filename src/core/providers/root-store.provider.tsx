import React, { createContext, ReactNode, useContext } from "react";
import { enableStaticRendering } from "mobx-react";
import MasterStore, { MasterStoreHydration } from "../stores/master.store";

enableStaticRendering(typeof window === "undefined");

// Local module level variable of singleton store
let store: MasterStore;
const StoreContext = createContext<MasterStore | undefined>(undefined);
StoreContext.displayName = "MasterStore";

// Make sure store is used within provider
export const useStore = (): MasterStore | undefined => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("MasterStore must be used within a StoreProvider");
  }

  return context;
};

// Function to initialize the store
export const initializeStore = (
  initialData?: MasterStoreHydration
): MasterStore => {
  const _store = store ?? new MasterStore();

  // If initialData supplied hydrate the store
  if (initialData) {
    _store.hydrate(initialData);
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return store;
};

// Creating the MasterProvider
export function MasterStoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode;
  hydrationData?: MasterStoreHydration;
}) {
  const store = initializeStore(hydrationData);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
