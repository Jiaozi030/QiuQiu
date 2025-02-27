<template>
    <view class="viewers-page">
        <view class="user-list">
            <UserCard v-for="(user, index) in viewers" :key="index" :user="user" />
        </view>
    </view>
</template>

<script>
import UserCard from '@/components/UserCard.vue'; // 引入 UserCard 组件
import { sampleUsers } from '@/data/sampleUsers.js'; // 引入模拟数据

export default {
    components: {
        UserCard,
    },
    data() {
        return {
            viewers: sampleUsers, // 使用模拟数据
        };
    },
};
</script>

<style>
.viewers-page {
    padding: 20px;
}

.user-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>