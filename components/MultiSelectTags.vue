<template>
    <view class="multi-select-tags">
        <view
            v-for="(tag, index) in tags"
            :key="index"
            class="tag"
            :class="{ selected: selectedTags.includes(tag) }"
            @click="toggleTag(tag)"
            >
            {{ tag }}
        </view>
    </view>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            required: true,
        },
        selectedTags: {
            type: Array,
            required: true,
        },
    },
    methods: {
        toggleTag(tag) {
            this.$emit('update:selectedTags', tag);
        },
    },
};
</script>

<style>
.multi-select-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    padding: 6px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    font-size: 12px;
    color: #666;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tag.selected {
    border-color: #6096b7;
    background-color: #61869d;
    color: #fff;
}
</style> 