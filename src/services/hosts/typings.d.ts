// @ts-ignore
/* eslint-disable */

declare namespace API {
  type hostInventoryList = {
    data?: hostInventoryListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type hostInventoryListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    id?: string;
    name?: string;
    owner?: string;
    desc?: string;
    size?: number;
    tags?: string[];
    status?: number;
    updatedAt?: string;
    createdAt?: string;
  };
  type CurrenthostInventory = {
    name?: string;
    size?: string;
    id?: string;
    tags?: { key?: string; label?: string }[];
    state?: string;
    desc?: string;
    updatedAt?: string;
    createdAt?: string;
  };
}
