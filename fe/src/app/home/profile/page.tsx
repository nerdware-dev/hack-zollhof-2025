"use client";

import { useUserStore } from "@/stores/user/userStore";

export default function Profile() {
  const userStore = useUserStore();

  return <div>
    <div>
      <h1>Profile</h1>
      <p>Firstname: {userStore.firstname}</p>
      <p>Lastname: {userStore.lastname}</p>
      <p>Email: {userStore.email}</p>
    </div>
  </div>;
}
