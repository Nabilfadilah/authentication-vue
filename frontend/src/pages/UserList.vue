<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <!-- cek apakah user yang login adalah admin -->
    <template v-if="authStore.user?.role === 'admin'">
      <div class="flex items-center justify-between mb-4">
        <!-- judul Halaman -->
        <Typography class="text-xl font-bold">Daftar User Register</Typography>
      </div>

      <!-- tabel User -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="py-2 px-4 border text-start">No.</th>
              <th class="py-2 px-4 border">Nama</th>
              <th class="py-2 px-4 border">Email</th>
              <th class="py-2 px-4 border">Role</th>
              <th class="py-2 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <!-- looping daftar user -->
            <!-- v-for untuk menampilkan daftar user dalam tabel -->
            <tr
              v-for="(user, index) in userAll"
              :key="user.id"
              class="border-b hover:bg-gray-100"
            >
              <td class="py-2 px-4 border w-11 text-center">{{ index + 1 }}.</td>
              <td class="py-2 px-4 border font-semibold text-start">
                {{ user.name }}
              </td>
              <td class="py-2 px-4 border text-gray-600 text-start">
                {{ user.email }}
              </td>
              <td class="py-2 px-4 border text-gray-500 italic text-start">
                {{ user.role }}
              </td>
              <td class="py-2 px-4 border">
                <div class="flex justify-center flex-wrap gap-2">
                  <!-- tombol edit -->
                  <ButtonAll
                    @click="handleEdit(user.id)"
                    class="bg-blue-600 hover:bg-blue-700"
                  >
                    ✏ Edit
                  </ButtonAll>

                  <!-- tombol hapus -->
                  <ButtonAll
                    @click="handleDelete(user.id)"
                    class="bg-red-600 hover:bg-red-700"
                  >
                    🗑 Delete
                  </ButtonAll>

                  <!-- tombol reset password -->
                  <ButtonAll class="bg-yellow-600 hover:bg-yellow-700">
                    <router-link :to="`/admin/reset-password/${user.id}`">
                      🔄 Reset
                    </router-link>
                  </ButtonAll>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- jika bukan admin, tampilkan pesan ini -->
    <Typography v-else>Hanya admin yang bisa melihat data user.</Typography>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/auth";
import axiosInstance from "@/plugins/axiosInstance";
import ButtonAll from "@/elements/ButtonAll.vue";
import Typography from "@/elements/Typography.vue";

const authStore = useAuthStore(); // mengakses data user yang login dari store
const router = useRouter(); // menggunakan router Vue

const userAll = ref([]); // state untuk menyimpan daftar user

// ambil data user jika yang login adalah admin
const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get("/users"); // ambil data user dari API
    userAll.value = res.data.users; // simpan data ke state
  } catch (err) {
    console.error("Gagal mengambil data user:", err);
  }
};

// onMounted untuk memanggil data user saat komponen dimuat
onMounted(() => {
  // ketika komponen pertama kali dimuat, cek apakah user adalah admin.
  if (authStore.user?.role === "admin") {
    // jika ya, panggil fetchUsers() untuk mengambil daftar user
    fetchUsers();
  }
});

// fungsi edit user
const handleEdit = (id) => {
  router.push(`/users/${id}`); // navigasi ke halaman edit user
};

// fungsi hapus user
const handleDelete = async (id) => {
  if (confirm("Yakin ingin menghapus user ini?")) {
    try {
      await axiosInstance.delete(`/user/${id}`); // hapus user di API
      alert("User berhasil dihapus");
      fetchUsers(); // refresh daftar user
    } catch (err) {
      console.error("Gagal menghapus user:", err);
      alert("Gagal menghapus user");
    }
  }
};
</script>
