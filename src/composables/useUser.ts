import { ref, onMounted } from 'vue'
import axios from 'axios'

interface User {
  id: number
  name: string
}

export function useUser(userId: number) {
  const user = ref()

  async function fetchUser(id: number) {
    user.value = (await axios.get<User>(`users/${id}`)).data
  }

  onMounted(() => fetchUser(userId))

  return { user }
}
