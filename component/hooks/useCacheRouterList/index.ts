import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export const useCacheRouterList = (defaultPath = '/home') => {
  const routerList = reactive(new Map());
  const $router = useRouter();

  const add = (to): void => {
    if (defaultPath !== to.path) {
      routerList.set(to.name, to);
    }
    if (routerList.size > 5) {
      routerList.delete([...routerList.keys()][0]);
    }
  };

  $router.afterEach((to) => {
    add(to);
    return to;
  });

  return [routerList, routerList.delete.bind(routerList)];
};
