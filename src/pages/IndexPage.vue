<template>
  <q-page
    padding
    class=""
    style="display: flex; flex-direction: column;"
    :style-fn="(offset) => {
      return {
        height: `calc(100vh - ${offset}px)`,
        overflow: 'hidden'
      }
    }
      "
  >
    <q-inner-loading
      :showing="home.innerLoading"
      style="height: 70%; z-index: 3;"
    >
      <q-spinner-gears
        size="min(50vw, 50vh)"
        color="primary"
      />
    </q-inner-loading>

    <q-form
      class="col-auto q-pb-md"
      style="border-bottom: 1px solid black;"
      @submit="home.onSubmit($route, $router)"
    >
      <div
        class="row q-col-gutter-xs"
        v-if="home.show_form"
      >
        <div class="col-12 col-sm-6 col-md-4">
          <q-input
            dense
            outlined
            v-model="home.form.dawr_hming"
            label="Dawr hming"
          ></q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <q-input
            dense
            outlined
            v-model="home.form.neitu_hming"
            label="Dawr neitu hming"
          ></q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <q-input
            dense
            outlined
            v-model="home.form.phone"
            label="Phone"
          ></q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <q-input
            dense
            outlined
            v-model="home.form.address"
            label="Address"
          ></q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <q-input
            dense
            outlined
            v-model="home.form.sold_count"
            label="Hralh zat (pack)"
          ></q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <q-input
            dense
            outlined
            v-model="home.form.sold_amount"
            label="Hralhna man (₹)"
          ></q-input>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <q-btn
            :loading="home.loadingSubmit"
            unelevated
            type="submit"
            class="full-width"
            label="Submit"
            color="primary"
          ></q-btn>
        </div>
      </div>
    </q-form>
    <div
      class="col"
      :class="{
        'row': home.show_form
      }"
      style="overflow: auto; position: relative;"
    >
      <div
        class="full-width row justify-between"
        style="z-index: 2; position: sticky; top:0;
         right:0;
          background-color: white; border-bottom: 1px solid black;
          height: 50px;"
      >
        <div
          class="col row items-center"
          style="font-size: 20px;"
        >
          Entries
        </div>
        <div class="col-auto">
          <q-btn
            v-if="home.sold_list?.length"
            flat
            round
            @click="home.show_form = !home.show_form"
            :icon="home.show_form ? `expand_less` : `expand_more`"
          ></q-btn>
        </div>
      </div>
      <div class="full-width q-px-sm">
        <template
          v-for="(item, index) in home.sold_list"
          :key="index"
        >
          <q-markup-table
            flat
            bordered
            class="q-mt-sm"
          >
            <q-tr>
              <q-td auto-width>Dawr Hming</q-td>
              <q-td auto-width>:</q-td>
              <q-td>
                {{ item.dawr_hming }}
              </q-td>
            </q-tr>
            <q-tr>
              <q-td auto-width>Dawr Neitu</q-td>
              <q-td auto-width>:</q-td>
              <q-td>
                {{ item.neitu_hming }}
              </q-td>
            </q-tr>

            <q-tr>
              <q-td auto-width>Contact</q-td>
              <q-td auto-width>:</q-td>
              <q-td>
                {{ item.phone }}
              </q-td>
            </q-tr>
            <q-tr>
              <q-td auto-width>Address</q-td>
              <q-td auto-width>:</q-td>
              <q-td>
                {{ item.address }}
              </q-td>
            </q-tr>
            <q-tr>
              <q-td auto-width>Man/Zat</q-td>
              <q-td auto-width>:</q-td>
              <q-td>
                ₹{{ item.sold_amount }}/{{ item.sold_count }}
              </q-td>
            </q-tr>
            <q-tr>
              <q-td colspan="100%">
                <!-- :href="`https://maps.google.com?${item.latitude},${item.longitude}&t=&z=20`" -->
                <a
                  :href="`https://www.google.com/maps/@${item.latitude},${item.longitude},20z?entry=ttu`"
                  target="_blank"
                >
                  <div style="pointer-events: none;">
                    <iframe
                      :src="`https://maps.google.com/maps?q=${item.latitude},${item.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
                    ></iframe>
                  </div>
                </a>

                <!-- <iframe
                  :src="`https://maps.google.com/maps?q=${item.latitude},${item.longitude}&zoom=18
  &maptype=satellite`"
                ></iframe> -->

              </q-td>
            </q-tr>
          </q-markup-table>
        </template>

      </div>

      <!-- <pre>
  {{ home.sold_list }}
</pre> -->
    </div>

  </q-page>
</template>

<script setup>
import { user } from 'src/scripts/auth/user';
import { home } from 'src/scripts/home/script';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(async () => {
  try {
    home.innerLoading = true
    user.check_auth(router)
  } catch (error) {
    console.error(error.message);
  }
});

function getMapUri(item) {
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.17777915955!2d${item.longitude}!3d${item.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374debb85cfb099f%3A0xb99311021f7c7c83!2s${encodeURIComponent(item.dawr_hming ?? item.neitu_hming)}!5e0!3m2!1sen!2sin!4v1705085320355!5m2!1sen!2sin`
}
</script>
