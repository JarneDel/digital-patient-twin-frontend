<!-- <template>
  <label for="firstname" class="mb-2 block">Voornaam</label>
  <input
    type="text"
    id="firstname"
    v-model="props.value"
    :class="{ 'border-red-500': isFirstNameInvalid }"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="isFirstNameInvalid" class="break-word inline-block text-red-500">
    {{ firstNameErrorMessage }}
  </span>
</template>
<script setup lang="ts">
const isFirstNameInvalid = ref(false)
const firstNameErrorMessage = ref('')

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emits = defineEmits(['update:value', 'update:isValid'])

watch(props.value, newValue => {
  if (newValue.trim().length === 0) {
    isFirstNameInvalid.value = true
  } else if (newValue.trim().length < 2) {
    isFirstNameInvalid.value = true
    firstNameErrorMessage.value =
      'Uw voornaam moet minstens 2 karakters bevatten.'
  } else {
    isFirstNameInvalid.value = false
  }
})
</script>

<style scoped>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style> -->
<!-- achternaam -->
<!-- <template>

  <label for="familytname" class="mb-2 block">Achternaam</label>
  <input
    id="familytname"
    v-model="familytName"
    :class="{ 'border-red-500': isfamilytNameInvalid }"
    class="focus:border-tertiary-600 peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span
    v-if="isfamilytNameInvalid"
    class="break-word inline-block text-red-500"
  >
    {{ familytNameErrorMessage }}
  </span>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

const familytName = ref('')
const isfamilytNameInvalid = ref(false)
const familytNameErrorMessage = ref('')

watch(familytName, newValue => {
  if (newValue.trim().length === 0) {
    isfamilytNameInvalid.value = true
  } else if (newValue.trim().length < 2) {
    isfamilytNameInvalid.value = true
    familytNameErrorMessage.value =
      'Uw achternaam moet minstens 2 karakters bevatten.'
  } else {
    isfamilytNameInvalid.value = false
  }
})
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style> -->

<!-- bloedtype -->

<!-- <template>
  <label for="bloodType" class="mb-2 block">Bloedtype</label>
  <input
    id="bloodType"
    type="text"
    v-model="bloodType"
    :class="{ 'border-red-500': isBloodTypeInvalid }"
    @input="validateBloodType"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
  />
  <span v-if="isBloodTypeInvalid" class="break-word inline-block text-red-500">
    {{ bloodTypeErrorMessage }}
  </span>
  <span
    v-else-if="bloodType === ''"
    class="break-word inline-block text-gray-500"
  >
    Onbekend
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const bloodType = ref('')
const isBloodTypeInvalid = ref(false)
const bloodTypeErrorMessage = ref('')

const validateBloodType = () => {
  const value = bloodType.value.trim()
  if (value !== '' && !/^(A|B|AB|O)(\+|\-)?$/.test(value)) {
    isBloodTypeInvalid.value = true
    bloodTypeErrorMessage.value =
      'Voer een geldig bloedtype in (bijv. A+, B-, AB, O+).'
  } else {
    isBloodTypeInvalid.value = false
    bloodTypeErrorMessage.value = ''
  }
}

watch(bloodType, () => {
  validateBloodType()
})
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
.text-gray-500 {
  color: #999999;
}
</style> -->

<!-- postcode -->

<!-- <template>
  <div class="flex gap-4">
    <div>
      <label for="postalCode" class="mb-2 block">Post code</label>
      <input
        id="postalCode"
        v-model="postalCode"
        :class="{ 'border-red-500': isPostalCodeInvalid }"
        type="number"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
        @input="validatePostalCode"
      />
      <span
        v-if="isPostalCodeInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ postalCodeErrorMessage }}
      </span>
    </div>

    <div>
      <label for="houseNumber" class="mb-2 block">Nummer</label>
      <input
        id="houseNumber"
        v-model="houseNumber"
        :class="{ 'border-red-500': isHouseNumberInvalid }"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
        @input="validateHouseNumber"
      />
      <span
        v-if="isHouseNumberInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ houseNumberErrorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const postalCode = ref('')
const houseNumber = ref('')
const isPostalCodeInvalid = ref(false)
const isHouseNumberInvalid = ref(false)
const postalCodeErrorMessage = ref('')
const houseNumberErrorMessage = ref('')

function validatePostalCode() {
  const numericRegex = /^[0-9]+$/
  isPostalCodeInvalid.value = !numericRegex.test(postalCode.value)
  postalCodeErrorMessage.value = 'Only numeric values are allowed.'
}

function validateHouseNumber() {
  const numericRegex = /^[0-9]+$/
  isHouseNumberInvalid.value = !numericRegex.test(houseNumber.value)
  houseNumberErrorMessage.value = 'Only numeric values are allowed.'
}

watch(postalCode, () => {
  validatePostalCode()
})

watch(houseNumber, () => {
  validateHouseNumber()
})
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style> -->

<!-- tele -->
<!-- <template>

  <label for="phone" class="mb-2 block">telefoon nummer</label>
  <input
    id="phone"
    v-model="phoneNumber"
    :class="{ 'border-red-500': isPhoneNumberInvalid }"
    class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
    @input="validatePhoneNumber"
  />
  <span
    v-if="isPhoneNumberInvalid"
    class="break-word inline-block text-red-500"
  >
    {{ phoneNumberErrorMessage }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const phoneNumber = ref('')
const isPhoneNumberInvalid = ref(false)
const phoneNumberErrorMessage = ref('')

function validatePhoneNumber() {
  const numericRegex = /^[0-9]+$/
  isPhoneNumberInvalid.value = !numericRegex.test(phoneNumber.value)
  phoneNumberErrorMessage.value = 'Only numeric values are allowed.'
}

watch(phoneNumber, () => {
  validatePhoneNumber()
})
</script>

<style>
.border-red-500 {
  border-color: #ef4444;
}
.text-red-500 {
  color: #ef4444;
}
</style> -->

<!-- <template>
  <div class="flex gap-4">
    <div>
      <label for="postalCode" class="mb-2 block">Post code</label>
      <input
        id="postalCode"
        v-model="postalcodeValue"
        :class="{ 'border-red-500': isPostalCodeInvalid }"
        type="number"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
      <span
        v-if="isPostalCodeInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ postalCodeErrorMessage }}
      </span>
    </div>

    <div>
      <label for="houseNumber" class="mb-2 block">Nummer</label>
      <input
        id="houseNumber"
        v-model="huisNumberValue"
        :class="{ 'border-red-500': isHouseNumberInvalid }"
        class="peer block h-fit w-full appearance-none rounded-lg border-2 border-gray-300 p-2 text-sm focus:border-2 focus:border-tertiary-500 focus:border-tertiary-600 focus:outline-none focus:ring-0 focus:ring-tertiary-300"
      />
      <span
        v-if="isHouseNumberInvalid"
        class="break-word inline-block text-red-500"
      >
        {{ houseNumberErrorMessage }}
      </span>
    </div>
  </div>
</template> -->
