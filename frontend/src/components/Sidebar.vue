<template>
  <!-- transition dengan animasi geser (slide) -->
  <transition name="slide">
    <div
      :class="[
        'fixed inset-0 z-40 flex', // sidebar muncul di atas konten lain
        isOpen ? '' : 'hidden', // sembunyikan jika sidebar tidak dibuka
        'md:static md:inset-auto md:translate-x-0 md:flex', // pada layar medium ke atas, sidebar selalu tampil
      ]"
    >
      <!-- overlay hitam transparan untuk mode mobile, menutup saat diklik -->
      <div
        class="fixed inset-0 bg-black opacity-50 md:hidden"
        @click="$emit('close')"
      ></div>

      <!-- kontainer Sidebar -->
      <div class="w-64 bg-gray-900 text-white z-50 h-full flex flex-col">
        <div class="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <!-- navigasi menu -->
        <nav class="flex-1 p-4 space-y-2">
          <!-- loop daftar navigasi sesuai role user -->
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            active-class="bg-gray-800 font-semibold"
            @click="$emit('close')"
          >
            <!-- tampilkan nama item (contoh: Dashboard, User List) -->
            {{ item.name }}
          </RouterLink>
          <!-- v-for="item in navItems" = loop setiap item dalam daftar navigasi -->
          <!-- :key="item.path"         = key unik berdasarkan path, untuk efisiensi rendering -->
          <!-- :to="item.path"          = arahkan ke path tujuan menggunakan Vue Router -->
          <!-- class                    = styling tampilan link dengan Tailwind CSS -->
          <!-- active-class             = styling khusus saat link aktif (halaman saat ini) -->
          <!-- @click="$emit('close')"  = emit event 'close' untuk menutup sidebar (biasanya di mobile) -->
        </nav>

        <!-- tombol logout di bagian bawah sidebar -->
        <div class="p-4 border-t border-gray-700">
          <ButtonAll
            @click="handleLogout"
            class="w-full bg-red-500 hover:bg-red-600"
          >
            Logout
          </ButtonAll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {defineProps, defineEmits, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/store/auth";
import ButtonAll from "@/elements/ButtonAll.vue";

// props dari parent: apakah sidebar sedang terbuka
const props = defineProps({
  isOpen: Boolean,
});

// emit event close ke parent
const emit = defineEmits(["close"]);

// inisialisasi store autentikasi menggunakan Pinia
const authStore = useAuthStore();

// router digunakan untuk navigasi ke halaman lain
const router = useRouter();

// ambil role user dari store auth
const role = computed(() => authStore.user?.role);

// tentukan isi menu navigasi berdasarkan role user
const navItems = computed(() => {
  const items = [{name: "Dashboard", path: "/dashboard"}];

  if (role.value === "admin") {
    items.push({name: "User List", path: "/users"});
    items.push({name: "Biodata List", path: "/biodata"});
  } else if (role.value === "user") {
    items.push({name: "Biodata", path: "/biodata"});
  }

  return items;
});

// fitur untuk logout dan redirect ke halaman login
const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
/* animasi slide untuk sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
