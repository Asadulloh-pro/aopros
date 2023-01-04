import { StoreApi, UseBoundStore } from 'zustand';
import { Services } from '../services';
import {
  createDataType,
  DeleteDialog,
  drawerAction,
  getDataType,
  IAos_config,
  NavigateFunction,
  StoreType,
} from '../types';

export default class Aos<
  ST_T
> {
  services: Services;
  useAllStore: (
    type: keyof ST_T
  ) => UseBoundStore<StoreApi<ST_T[keyof ST_T] | StoreType>>;
  apiUrls: {
    [P in keyof ST_T]: string;
  };
  useDialog: UseBoundStore<StoreApi<DeleteDialog>>;

  constructor(
    config: IAos_config<
      keyof ST_T,
      ST_T[keyof ST_T],
      {
        [P in keyof ST_T]: string;
      }
    >
  ) {
    this.services = new Services(config?.services);
    this.useAllStore = config.store;
    this.apiUrls = config.apiUrls;
    this.useDialog = config.useDialog;
  }

  public async getData<T>({
    params,
    moduleType,
    stateName,
    path,
    customPath,
    setError,
  }: getDataType<keyof ST_T, T>) {
    const { setState } = this.useAllStore(moduleType);
    setState({ loading: true });
    try {
      const response = await this.services.fetch(
        this.generateApi(moduleType, path, customPath),
        {
          params,
        }
      );
      if (stateName) {
        setState({ [stateName]: response?.data });
      } else {
        return response?.data;
      }
    } catch (err) {
      if (setError) {
        setError(err);
      } else {
        setState({ statusError: err });
      }
    } finally {
      setState({ loading: false });
    }
  }

  public async createData<T>({
    data,
    moduleType,
    stateName,
    path,
    customPath,
  }: createDataType<keyof ST_T, T>) {
    const { setState } = this.useAllStore(moduleType);
    try {
      const result = await this.services.create(
        this.generateApi(moduleType, path, customPath),
        data
      );
      if (stateName) {
        setState({
          [stateName]: {
            isOpen: false,
            type: '',
          },
        });
      }
      return result;
    } catch (err) {
      return err;
    } finally {
      setState((state: StoreType) => ({ refresh: !state.refresh }));
    }
  }

  public async updateData<T>({
    data,
    moduleType,
    stateName,
    path,
    customPath,
  }: createDataType<keyof ST_T, T>) {
    const { setState } = this.useAllStore(moduleType);

    try {
      const result = await this.services.update(
        this.generateApi(moduleType, path, customPath),
        data
      );
      if (stateName) {
        setState({
          [stateName]: {
            isOpen: false,
            type: '',
          },
        });
      }
      return result;
    } catch (err) {
      return err;
    } finally {
      setState((state: StoreType) => ({ refresh: !state.refresh }));
    }
  }

  public async deleteData(
    moduleType: keyof ST_T,
    path?: string,
    customPath?: string
  ) {
    const { setState } = this.useAllStore(moduleType);
    try {
      const result = await this.services.delete(
        this.generateApi(moduleType, path, customPath)
      );
      return result;
    } catch (err) {
      return err;
    } finally {
      setState((state: StoreType) => ({ refresh: !state.refresh }));
    }
  }

  public onDelete(id: string | number, fn: (id: string | number) => void) {
    const { getState } = this.useDialog;
    const deleteFn = () => {
      fn(id);
    };
    getState().setDeleteInfo({
      isOpen: true,
      info: {
        title: 'Delete element',
        text: 'Are you sure you want to delete this item?',
      },
      fn: deleteFn,
    });
  }

  protected drawerAction<IN_T>({
    type,
    info,
    moduleType,
    action,
    builderType,
  }: drawerAction<IN_T, keyof ST_T>) {
    const { setState } = this.useAllStore(moduleType);

    setState({
      drawer: {
        isOpen: action,
        type,
        info,
        builderType,
      },
    });
  }

  public generateApi(
    moduleType: keyof ST_T,
    path?: string,
    customPath?: string
  ) {
    const url = customPath ? customPath : this.apiUrls[moduleType];
    if (path) return url + path;
    else return url;
  }

  public paginationConfig({
    setSearchParams,
    searchParams,
    navigate,
    data,
    url,
  }: {
    setSearchParams: (name: string, value: string | number) => void;
    searchParams: { [k: string]: string | number };
    navigate: NavigateFunction;
    data: { [k: string]: [] };
    url: string;
  }) {
    if (data?.data !== null && !data?.data?.length && +searchParams?.page > 1) {
      setSearchParams('page', +searchParams?.page - 1 || 1);
    } else if (!data?.data?.length && +searchParams?.page === 1) {
      navigate(url);
    }
  }

  public tableConfig({
    searchParams,
    data,
  }: {
    searchParams: { [k: string]: string | number };
    data: { [k: string]: string | number };
  }): {
    total: number;
    pageIndex: number;
    pageSize: number;
  } {
    const total = Number(data?.total_pages);
    const pageIndex = Number(searchParams?.page) || 1;
    const pageSize = Number(data?.page_size);
    return { total, pageIndex, pageSize };
  }
}
