<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useCreateOrder } from '@/composables/useOrders'
import { useProducts } from '@/composables/useProducts'
import { useZodForm } from '@/composables/useZodForm'
import { useCartStore } from '@/stores/cart'
import ProductSelector from '@/components/ProductSelector.vue'
import OrderCart from '@/components/OrderCart.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { createOrderSchema } from '@/models/order'
import { getErrorMessage } from '@/utils/format'

const router = useRouter()
const createOrderMutation = useCreateOrder()
const cartStore = useCartStore()

const productSearch = ref('')
const productPage = ref(1)
const { data: productsData, isLoading, isError } = useProducts(productSearch, ref(''), productPage)

watch(productSearch, () => { productPage.value = 1 })

const pagination = computed(() => productsData.value?.data.pagination)
const products = computed(() => productsData.value?.data.items ?? [])

const errorMsg = ref('')
const { errors: validationErrors, validate } = useZodForm(createOrderSchema)

async function handleSubmit() {
  const payload = {
    items: cartStore.items.map((item) => ({ product_id: item.productId, quantity: item.quantity })),
  }

  if (!validate(payload)) return

  errorMsg.value = ''
  try {
    await createOrderMutation.mutateAsync(payload)
    cartStore.clear()
    router.push({ name: 'orders' })
  } catch (err: unknown) {
    errorMsg.value = getErrorMessage(err, 'Failed to create order.')
  }
}
</script>

<template>
  <div>
    <button
      class="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-slate-800"
      @click="router.push({ name: 'orders' })"
    >
      <ArrowLeft class="h-4 w-4" />
      Back to Orders
    </button>
    <h1 class="text-2xl font-bold text-slate-800">Create Order</h1>
    <p class="mt-1 text-sm text-gray-500">Select products and quantities to create a new order.</p>

    <div v-if="errorMsg" class="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
      {{ errorMsg }}
    </div>

    <div v-if="validationErrors.items" class="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
      {{ validationErrors.items }}
    </div>

    <LoadingSpinner v-if="isLoading" class="mt-8" />

    <div v-else-if="isError" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
      Failed to load products. Please try again later.
    </div>

    <div v-else class="mt-6 grid gap-6 lg:grid-cols-2">
      <ProductSelector
        :products="products"
        :cart-quantities="cartStore.quantities"
        :pagination="pagination"
        :search="productSearch"
        :page="productPage"
        @update:search="productSearch = $event"
        @update:page="productPage = $event"
        @add="cartStore.add"
      />

      <OrderCart
        :items="cartStore.items"
        :total="cartStore.total"
        :loading="createOrderMutation.isPending.value"
        @increment="cartStore.increment"
        @decrement="cartStore.decrement"
        @remove="cartStore.remove"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>
