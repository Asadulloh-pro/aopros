import { StoreApi, UseBoundStore } from 'zustand';
import { Services } from '../services';
import {
  createDataType,
  DeleteDialog,
  drawerAction,
  getDataType,
  IAos_config,
  IPagination,
  NavigateFunction,
  StoreType,
} from '../types';

export default class Aos<ST_T> {
  services: Services;
  useAllStore: (
    type: keyof ST_T
  ) => UseBoundStore<StoreApi<ST_T[keyof ST_T] | StoreType>>;
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
    this.useDialog = config.useDialog;
  }

  public async fetchData<T>({
    params,
    moduleName,
    stateName,
    path,
    setError,
    ignoreError,
    loading = 'loading',
  }: getDataType<keyof ST_T, T>) {
    const { setState } = this.useAllStore(moduleName);
    setState({ [loading]: true });
    try {
      const response = await this.services.fetch(path, {
        params,
      });
      if (stateName) {
        setState({ [stateName]: response?.data });
      } else {
        return response?.data;
      }
    } catch (err) {
      if (!ignoreError) {
        if (setError) {
          setError(err);
        } else {
          setState({ statusError: err });
        }
      }
    } finally {
      setState({ [loading]: false });
    }
  }

  public async postData<T>({
    data,
    moduleName,
    stateName,
    path,
    loading,
    refresh = 'refresh' as keyof T,
    option = {},
  }: createDataType<keyof ST_T, T>) {
    const { setState } = this.useAllStore(moduleName);
    if (loading) setState({ [loading]: true });
    try {
      const result = await this.services.create(path, data, option);
      if (stateName === 'drawer') {
        setState({
          [stateName]: {
            isOpen: false,
            type: '',
          },
        });
      } else if (stateName) {
        setState({
          [stateName]: result?.data,
        });
      }
      return result;
    } catch (err) {
      return err;
    } finally {
      if (loading) setState({ [loading]: false });
      if (refresh)
        setState((state: StoreType & T) => ({ [refresh]: !state[refresh] }));
    }
  }

  public async putData<T>({
    data,
    moduleName,
    stateName,
    path,
    loading,
    refresh = 'refresh' as keyof T,
    option = {},
  }: createDataType<keyof ST_T, T>) {
    const { setState } = this.useAllStore(moduleName);
    if (loading) setState({ [loading]: true });
    try {
      const result = await this.services.update(path, data, option);
      if (stateName === 'drawer') {
        setState({
          [stateName]: {
            isOpen: false,
            type: '',
          },
        });
      } else if (stateName) {
        setState({
          [stateName]: result?.data,
        });
      }
      return result;
    } catch (err) {
      return err;
    } finally {
      if (loading) setState({ [loading]: false });
      if (refresh)
        setState((state: StoreType & T) => ({ [refresh]: !state[refresh] }));
    }
  }

  public async deleteData(
    moduleName: keyof ST_T,
    path: string,
    loading?: string
  ) {
    const { setState } = this.useAllStore(moduleName);
    this.useDialog.setState({ buttonLoading: true });
    try {
      const result = await this.services.delete(path);
      return result;
    } catch (err) {
      return err;
    } finally {
      if (loading) setState({ [loading]: false });
      this.useDialog.setState({ buttonLoading: false });
      setState((state: StoreType) => ({
        ['refresh']: !state.refresh,
      }));
    }
  }

  public onDelete(
    id: string | number,
    fn: (id: string | number) => void,
    message: {
      title: string;
      text: string;
    }
  ) {
    const { getState } = this.useDialog;
    const deleteFn = () => {
      fn(id);
    };
    getState().setDeleteInfo({
      isOpen: true,
      info: {
        title: message?.title,
        text: message?.text,
      },
      fn: deleteFn,
    });
  }

  protected drawerAction<IN_T>({
    type,
    info,
    moduleName,
    action,
    builderType,
  }: drawerAction<IN_T, keyof ST_T>) {
    const { setState } = this.useAllStore(moduleName);

    setState({
      drawer: {
        isOpen: action,
        type,
        info,
        builderType,
      },
    });
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

  public tableConfig<T>({
    searchParams,
    data,
  }: {
    searchParams: { [k: string]: string | number };
    data: IPagination;
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
