<template>
  <!-- container form -->
  <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded">
    <!-- header form dan tombol kembali -->
    <div class="flex items-center justify-between mb-4">
      <Typography class="text-xl font-semibold">Edit User</Typography>
      <ButtonAll>
        <RouterLink to="/users">⬅ Back</RouterLink>
      </ButtonAll>
    </div>

    <!-- pesan error jika ada -->
    <p v-if="error" class="text-red-600 mb-2">{{ error }}</p>

    <!-- form untuk edit user -->
    <form @submit.prevent="handleSubmit" class="space-y-3">
      <!-- input nama -->
      <div>
        <InputForm
          label="Nama" 
          v-model="formData.name"
          name="name"
          type="text"
        />
      </div>

      <!-- input email -->
      <div>
        <InputForm 
          label="Email"
          v-model="formData.email"
          name="email"
          type="email"
        />
      </div>

      <!-- dropdown role (hanya tampil jika yang login adalah admin) -->
      <div v-if="authStore.user?.role === 'admin'">
        <label for="role" class="block font-medium mb-1">Role</label>
        <select
          v-model="formData.role"
          name="role"
          class="w-full border p-1 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <!-- tombol submit -->
      <div class="text-center">
        <ButtonAll type="submit" class="bg-blue-600 hover:bg-blue-700">
          Simpan Perubahan
        </ButtonAll>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue"; // hook reaktif & lifecycle
import {useRoute, useRouter} from "vue-router"; // untuk akses params & redirect
import axiosInstance from "@/plugins/axiosInstance"; // axios instance untuk request API
import {useAuthStore} from "@/store/auth"; // store auth untuk akses user login
import Typography from "@/elements/Typography.vue";
import ButtonAll from "@/elements/ButtonAll.vue";
import InputForm from "@/elements/InputForm.vue";

const route = useRoute(); // ambil informasi route (termasuk param ID)
const router = useRouter(); // untuk redirect
const authStore = useAuthStore(); // akses data user yang sedang login

// ambil ID user dari URL
const id = route.params.id;

// state form yang akan diisi oleh data user
const formData = ref({
  name: "",
  email: "",
  role: "",
});

// state untuk menampilkan error jika ada
const error = ref("");

// ambil data user berdasarkan ID
const fetchUser = async () => {
  try {
    // lakukan request GET ke API untuk ambil data user
    const res = await axiosInstance.get(`/users/${id}`);

    // isi form dengan data user dari response
    formData.value = {
      name: res.data.name,
      email: res.data.email,
      role: res.data.role,
    };
  } catch (err) {
    // jika gagal, tampilkan pesan error
    error.value = "Gagal mengambil data user";
  }
};

// lifecycle hook untuk ambil data saat komponen pertama kali dimount(dimuat)
onMounted(() => {
  fetchUser();
});

// fungsi untuk submit form edit
const handleSubmit = async () => {
  try {
    // buat objek payload yang akan dikirim ke backend
    const payload = {
      name: formData.value.name,
      email: formData.value.email,
    };

    // jika user yang login adalah admin, sertakan juga role
    if (authStore.user?.role === "admin") {
      payload.role = formData.value.role;
    }

    // lakukan PUT request ke endpoint edit user
    await axiosInstance.put(`/user/${id}/edit`, payload);

    // jika berhasil, tampilkan alert dan redirect ke halaman user list
    alert("User berhasil diperbarui");
    router.push("/users");
  } catch (err) {
    // jika gagal, tampilkan error dari response API (jika ada)
    error.value = err.response?.data?.message || "Gagal update user";
  }
};
</script>
