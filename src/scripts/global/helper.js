import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { reactive } from "vue";

const useHelper = reactive({
  showConfirmDeleteDialog: false,
  loadingConfirmDelete: false,
  tempData: {
    id: null,
    endpoint: "",
    title: "",
  },
  deleteResponse: {},
  pagination: {},
  onConfirmDelete: onConfirmDelete,
});

async function onConfirmDelete() {
  try {
    useHelper.loadingConfirmDelete = true;
    const res = await api.delete(
      `${useHelper.tempData.endpoint}/${useHelper.tempData.id}`,
      {
        params: {
          ...useHelper.pagination,
        },
      }
    );
    useHelper.showConfirmDeleteDialog = false;
    return res.data;
  } catch (error) {
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  useHelper.loadingConfirmDelete = false;
}
export { useHelper };
