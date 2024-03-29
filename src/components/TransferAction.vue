<script lang="ts">
import {
    defineComponent,
    PropType,
    computed,
    watch,
    reactive,
    onMounted,
} from 'vue';
import AccountSearch from 'components/AccountSearch.vue';
import { getChain } from 'src/config/ConfigManager';
import { ProposalAction } from 'src/types';

const chain = getChain();

interface Field {
  name: string;
  type: string;
}

export default defineComponent({
    name: 'TransferAction',
    components: {
        AccountSearch,
    },
    props: {
        modelValue: {
            type: Object as PropType<ProposalAction>,
        },
        fields: {
            type: Object as PropType<Field[]>,
        },
    },
    setup(props, context) {
        const action = reactive<ProposalAction>(props.modelValue);

        const mask = computed(() => {
            const { precision } = chain.getSystemToken();
            let mask = '#';
            if (precision > 0) {
                mask += `.${'#'.repeat(precision)}`;
            }
            return mask;
        });

        const token = computed(() => chain.getSystemToken().symbol);

        const updateAction = (newAction: ProposalAction) => {
            let actionToFormat = { ...newAction };
            const { precision } = chain.getSystemToken();

            const numberArray = actionToFormat.data.quantity.match(/\d+/g);

            let quantity = '0';
            let fractionPart = '';

            if (numberArray?.length > 0) {
                quantity = numberArray[0] + '.';
                fractionPart = numberArray[1] ?? '';
            }

            // slice will cap the fraction part to precision and padEnd will fill the precision with zeros if needed
            quantity += fractionPart.slice(0, precision).padEnd(precision, '0');
            actionToFormat.data.quantity = quantity;

            action.data = { ...actionToFormat.data };
        };

        onMounted(() => {
            updateAction(props.modelValue);
        });

        watch(() => props.modelValue, (currentValue) => {
            updateAction(currentValue);
        });

        watch(action, (currentValue) => {
            if (!currentValue.data.quantity.includes(token.value)) {
                currentValue.data.quantity = `${currentValue.data.quantity} ${token.value}`;
            }
            context.emit('update:modelValue', currentValue);
        });

        return {
            mask,
            token,
            action,
        };
    },
});
</script>

<template>

<div v-if="!!fields" class="row q-col-gutter-md">
    <div v-for="field in fields" :key="field.name" class="col-12 col-sm-6">
        <AccountSearch
            v-if="field.type === 'name'"
            v-model="action.data[field.name]"
            emitUpdateOnInput
            outlined
            :filled="false"
            with-validation
            remove-search-icon
            bg-color="white"
            lazy-rules
            :label="field.name"
        />
        <q-input
            v-else-if="field.name === 'quantity'"
            v-model="action.data[field.name]"
            :mask="mask"
            :suffix="token"
            fill-mask="0"
            reverse-fill-mask
            outlined
            dense
            hide-bottom-space
            lazy-rules
            :label="field.name"
        />
        <q-input
            v-else
            v-model="action.data[field.name]"
            outlined
            dense
            hide-bottom-space
            lazy-rules
            :label="field.name"
        />
    </div>
</div>

</template>
