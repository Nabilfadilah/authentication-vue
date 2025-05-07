<template>
  <!-- container utama dengan lebar maksimal 4xl, tengah secara horizontal -->
  <div class="p-6 bg-white shadow-md rounded-lg">
    <!-- bagian header: judul dan tombol kembali -->
    <div class="flex items-center justify-between mb-4">
      <Typography class="text-xl font-bold">List Biodata Semua User</Typography>
    </div>

    <!-- tabel responsif horizontal jika ukuran layar kecil -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg">
        <!-- header tabel -->
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="py-2 px-4 border text-start">No.</th>
            <th class="py-2 px-4 border">Nama</th>
            <th class="py-2 px-4 border">Email</th>
            <th class="py-2 px-4 border">No Telepon</th>
            <th class="py-2 px-4 border">Alamat</th>
            <th class="py-2 px-4 border">Foto</th>
          </tr>
        </thead>

        <!-- isi tabel di-loop dari biodataList -->
        <tbody>
          <tr
            v-for="(b, index) in biodataList"
            :key="b.id"
            class="border-b hover:bg-gray-100"
          >
            <td class="py-2 px-4 border w-11 text-center">{{ index + 1 }}.</td>

            <!-- data user -->
            <td class="py-2 px-4 border font-semibold">{{ b.name }}</td>
            <td class="py-2 px-4 border text-gray-600">{{ b.email }}</td>
            <td class="py-2 px-4 border">{{ b.phone }}</td>
            <td class="py-2 px-4 border">{{ b.address }}</td>

            <!-- gambar profil: jika tidak ada, gunakan placeholder -->
            <td class="py-2 px-4 border">
              <img
                :src="b.photo ? b.photo : 'https://via.placeholder.com/50'"
                alt="User"
                class="w-12 h-12 rounded-full mx-auto object-cover"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// import fungsi-fungsi dari Vue
import {ref, onMounted} from "vue";

// import axios instance custom
import axiosInstance from "@/plugins/axiosInstance";

import ButtonAll from "@/elements/ButtonAll.vue";
import Typography from "@/elements/Typography.vue";

// state untuk menyimpan list biodata
const biodataList = ref([]);

// fungsi async untuk fetch semua biodata dari API
const fetchAll = async () => {
  try {
    // request GET ke endpoint /biodata
    const res = await axiosInstance.get("/biodata");
    console.log("DATA BIODATA:", res.data);

    // jika hasilnya array, langsung assign
    if (Array.isArray(res.data)) {
      biodataList.value = res.data;
    }
    // jika hasilnya bukan array tapi ada data, bungkus dalam array
    else if (res.data) {
      biodataList.value = [res.data];
    }
    // jika tidak ada data
    else {
      biodataList.value = [];
    }
  } catch (error) {
    // jika request gagal, tampilkan error dan kosongkan list
    console.error("Gagal mengambil data biodata:", error);
    biodataList.value = [];
  }
};

// saat komponen dimount ke DOM, panggil fetchAll()
onMounted(() => {
  fetchAll();
});
</script>
