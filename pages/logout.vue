<script setup>
import { msalInstance } from '~/auth'

onMounted(() => {
  msalInstance.logoutPopup()
})

</script>