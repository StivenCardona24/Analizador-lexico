<template>
    <div class="table-responsive " style="height: 75%;">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Palabra</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">indice_Siguiente</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(token, index) in tokens" :key="index">
                    <th scope="row" v-text="index"></th>
                    <td v-text="token.palabra"></td>
                    <td v-text="token.categoria"></td>
                    <td v-text="token.indice_sgt"></td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAnalyzerStore } from '@/store/index';

const AnalizerStore = useAnalyzerStore();
const { tokens } = storeToRefs(AnalizerStore);


</script>