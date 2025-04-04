<template>
  <!-- container utama dengan ukuran max-width dan styling -->
  <div class="max-w-md mx-auto mt-10 border p-6 rounded shadow">
    <!-- header dengan judul dan tombol kembali -->
    <div class="flex items-center justify-between mb-4">
      <Typography class="text-xl font-semibold">Reset Password User</Typography>
      <ButtonAll>
        <RouterLink to="/users"> Back </RouterLink>
      </ButtonAll>
    </div>

    <!-- menampilkan pesan sukses atau error jika ada -->
    <p
      v-if="message"
      class="mb-4 text-sm font-semibold"
      :class="message.includes('berhasil') ? 'text-green-500' : 'text-red-500'"
    >
      <!-- jika message ada (v-if="message"), akan ditampilkan -->
      {{ message }}
    </p>

    <!-- form untuk reset password -->
    <form @submit.prevent="handleReset">
      <!-- input untuk password baru -->
      <div class="mb-4">
        <InputForm
          label="Password Baru"
          type="password"
          v-model="newPassword"
          required
        />
      </div>

      <!-- input untuk konfirmasi password -->
      <div class="mb-4">
        <InputForm
          label="Konfirmasi Password Baru"
          type="password"
          v-model="confirmPassword"
          required
        />
      </div>

      <!-- tombol submit -->
      <div class="text-center">
        <ButtonAll type="submit" class="bg-blue-600 hover:bg-blue-700">
          Reset Password
        </ButtonAll>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue"; // ref digunakan untuk state
import {useRoute, useRouter} from "vue-router"; // menggunakan Vue Router untuk navigasi
import axiosInstance from "@/plugins/axiosInstance"; // instance Axios untuk request API
import Typography from "@/elements/Typography.vue";
import ButtonAll from "@/elements/ButtonAll.vue";
import InputForm from "@/elements/InputForm.vue";

const route = useRoute(); // mengakses parameter URL
const router = useRouter(); // untuk navigasi setelah reset password
const id = route.params.id; // mengambil ID user dari URL

// state untuk menyimpan password baru, konfirmasi password, dan pesan notifikasi
const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");

// fungsi untuk mereset password
const handleReset = async () => {
  // validasi: memastikan password baru dan konfirmasi harus sama
  if (newPassword.value !== confirmPassword.value) {
    message.value = "Password dan konfirmasi tidak cocok";
    return;
  }

  try {
    // kirim permintaan ke API untuk mereset password user dengan ID tertentu
    await axiosInstance.put(`/admin/reset-password/${id}`, {
      // ketika user mengetik password baru di input field, newPassword.value akan berubah
      // lalu dikirim ke API dalam bentuk objek
      newPassword: newPassword.value,
    });

    // jika berhasil, tampilkan pesan sukses
    message.value = "Password berhasil di-reset";

    // setelah 1,5 detik, redirect ke halaman /users
    setTimeout(() => {
      router.push("/users");
    }, 1500);
  } catch (error) {
    // jika gagal, tampilkan pesan error dari API atau pesan default
    message.value =
      error.response?.data?.message || "Gagal mereset password user";
  }
};
</script>

<style scoped></style>
