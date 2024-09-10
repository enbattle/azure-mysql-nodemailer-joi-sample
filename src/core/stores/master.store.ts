import EventHubLogStore from "./event-hub.store";

export type MasterStoreHydration = {
  eventHubStore: EventHubLogStore;
};

export default class MasterStore {
  eventHubStore: any;

  constructor() {
    this.eventHubStore = new EventHubLogStore();
  }

  hydrate(masterStoreData: MasterStoreHydration) {
    if (masterStoreData) {
      this.eventHubStore.hydrate(masterStoreData.eventHubStore);
    }
  }
}
