import {useAuth} from "@/modules/auth/use/useAuth";
import axios from "axios";
import {ItemCategory} from "@/modules/inventory_settings/types/ItemCategory";
import {useItemCategoryFilters} from "@/modules/inventory_settings/use/useItemCategoryFilters";
import {useItemCategory} from "@/modules/inventory_settings/use/useItemCatetory";

export const api = {
    async getItemCategories(): Promise<ItemCategory[]> {
        const {token} = useAuth();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
        const {filters, orderBy, order, limit, offset} = useItemCategoryFilters();
        const response = await axios.get(process.env.VUE_APP_ERP_URL + '/api/item_categories', {
            params: {
                filters: filters.value,
                orderBy: orderBy.value,
                order: order.value,
                limit: limit.value,
                offset: offset.value
            }
        });
        return new Promise(resolve => {
            resolve(response.data);
        });
    },
    async createItemCategory(): Promise<ItemCategory> {
        const {user} = useAuth();
        const {itemCategory} = useItemCategory();
        const response = await axios.post(process.env.VUE_APP_ERP_URL + '/api/item_categories', {
            id: itemCategory.value.id,
            name: itemCategory.value.name,
            description: itemCategory.value.description,
            state: itemCategory.value.state,
            companyId: user.value?.company.id,
        });
        return new Promise(resolve => {
            resolve(response.data);
        });
    },
    async findItemCategory(id: string): Promise<ItemCategory> {
        const response = await axios.get(process.env.VUE_APP_ERP_URL + '/api/item_categories/' + id);
        return new Promise(resolve => {
            resolve(response.data);
        });
    },
    async updateItemCategory(): Promise<ItemCategory> {
        const {itemCategory} = useItemCategory();
        const response = await axios.put(process.env.VUE_APP_ERP_URL + '/api/item_categories/' + itemCategory.value.id, {
            id: itemCategory.value.id,
            name: itemCategory.value.name,
            description: itemCategory.value.description,
            state: itemCategory.value.state,
            companyId: itemCategory.value.companyId,
        });
        return new Promise(resolve => {
            resolve(response.data);
        });
    },
    async updateItemCategoryState(id: string, state: string): Promise<ItemCategory> {
        const response = await axios.put(process.env.VUE_APP_ERP_URL + '/api/item_categories/state/' + id, {
            id,
            state
        });
        return new Promise(resolve => {
            resolve(response.data);
        });
    },
    async getItemCategoryOptions(id: string): Promise<string> {
        const {token} = useAuth();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
        const response = await axios.get(process.env.VUE_APP_ERP_URL + '/api/item_categories/options/' + id);
        return new Promise(resolve => {
            resolve(response.data);
        });
    },
    async getItemCategoryStates(id: string): Promise<string> {
        const {token} = useAuth();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
        const response = await axios.get(process.env.VUE_APP_ERP_URL + '/api/item_categories/states/' + id);
        return new Promise(resolve => {
            resolve(response.data);
        });
    },
}
