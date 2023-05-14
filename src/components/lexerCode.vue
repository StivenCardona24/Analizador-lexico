<template>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <div class="shadow-sm p-3 mb-5 bg-info text-white rounded">Codigo Fuente</div>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                        style="height: 700px ;" v-model="sourceCode"></textarea>
                    <label for="floatingTextarea2">Comments</label>
                </div>
            </div>
            <div class="col align-self-center ">
                <button type="button" class="btn btn-primary" @click="analizar()">Analizar</button>
            </div>
            <div class="col">
                <div class="shadow-sm p-3 mb-5 bg-info text-white rounded">Tokens</div>
                <table-tokens></table-tokens>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import tableTokens from '@/components/tableTokens.vue';
import { storeToRefs } from "pinia";
import { useAnalyzerStore } from '@/store/index';

const AnalizerStore = useAnalyzerStore();
const { sourceCode } = storeToRefs(AnalizerStore);
const { analizar } = AnalizerStore;

</script>