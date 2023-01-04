# Anysolve

![](https://github.com/Asadulloh-pro/anysolve/assets/logo.svg)

`$ npm install aopros axios zustand`

### useAllStore (Zustand)

```javascipt
// export module types
export type modulesType = {
  customers: CustomersStoreType;
  itemServices: ItemServicesStoreType;
  news: NewsStoreType;
};


export type allT =
  | CustomersStoreType
  | ItemServicesStoreType
  | NewsStoreType

import { StoreApi, UseBoundStore } from "zustand";
  // export module stores
export default const useAllStore = (
  type: keyof modulesType
): UseBoundStore<StoreApi<allT>> => {
  switch (type) {
    case "customers":
// return customers store
      return useCustomersStore;
    case "itemServices":
      return useServicesStore;
    case "news":
      return useNewsStore;
  }
};
```

### Dialog store
```javascript
const useDialog = create<DeleteDialog>()((set) => ({
  deleteInfo: {
    isOpen: false,
  },
  setDeleteInfo: (deleteInfo: Delete) => set(() => ({ deleteInfo })),
}));

export default useDialog;
```

### Main class
```javascript
// apiURLs - object which return modules {name: url}
const apiURLs: {
  [P in keyof modulesType]: string;
} = {
  customers: "customers",
  itemServices: "product",
  news: "news",
};

export class Aos extends BaseAos<modulesType> {
  constructor() {
    super({
      apiUrls: apiURLs,
      services: {
        messageConfig: {
// messageAlert function which return Snakebar (message, type: "danger" | "succes") =>
          messageAlert: messageAlert,
        },
        baseUrl: "https://baseURL",
      },
      store: useAllStore,
//store which
      useDialog: useDialog,
    });
  }
}
```