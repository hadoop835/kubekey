// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取主机组列表 GET /api/hostInventory */
export async function hostInventory(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.hostInventoryList>('/api/hostInventory', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
