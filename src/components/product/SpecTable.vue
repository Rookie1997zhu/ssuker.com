<script setup lang="ts">
import type { ProductSeries } from '@/data/products'
import { productTonOrder } from '@/data/products'

defineProps<{
  series: ProductSeries
}>()

const tons = productTonOrder()
</script>

<template>
  <div class="spec-wrap">
    <table class="spec-table">
      <thead>
        <tr>
          <th scope="col">SPEC</th>
          <th v-for="ton in tons" :key="ton" scope="col" class="tabular">{{ ton }}톤</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in series.specs" :key="row.label">
          <th scope="row">{{ row.label }}</th>
          <td v-for="ton in tons" :key="`${row.label}-${ton}`" class="tabular">
            {{ row.values[ton] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.spec-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  -webkit-overflow-scrolling: touch;
}

.spec-table {
  width: 100%;
  min-width: 720px;
  font-size: var(--text-sm);
}

th,
td {
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

thead th {
  position: sticky;
  top: 0;
  background: rgba(2, 56, 122, 0.08);
  color: var(--color-navy);
  font-family: var(--font-display);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

tbody th {
  position: sticky;
  left: 0;
  z-index: 1;
  min-width: 11rem;
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-weight: 500;
  border-right: 1px solid var(--line);
}

td {
  color: var(--text-secondary);
}

tbody tr:hover td,
tbody tr:hover th {
  background: rgba(0, 131, 167, 0.06);
}
</style>
