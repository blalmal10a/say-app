import { api } from "src/boot/axios";
import { reactive } from "vue";

const auth = reactive({
  user: {
    id: null,
    name: "",
    phone: "",
  },
  getUser: getUser,
});

async function getUser() {
  try {
    const res = await api.get("auth/user");

    auth.user = res.data.user;
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
}
export { auth };
