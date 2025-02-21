<template>
	<view class="filter-page">
		<view class="filter-item">
			<text class="filter-label">性别</text>
			<radio-group class="gender-options">
				<label class="gender-option">
					<radio value="male" /> 男
				</label>
				<label class="gender-option">
					<radio value="female" /> 女
				</label>
			</radio-group>
		</view>

		<view class="filter-item">
			<text class="filter-label">年龄</text>
			<slider :value="age" min="18" max="60" @change="onAgeChange" />
			<text class="slider-value">{{ age }} 岁</text>
		</view>

		<view class="filter-item">
			<text class="filter-label">身高</text>
			<slider :value="height" min="150" max="200" @change="onHeightChange" />
			<text class="slider-value">{{ height }} cm</text>
		</view>

		<view class="filter-item">
			<text class="filter-label">地区</text>
			<picker mode="region" @change="onRegionChange">
				<view class="picker">{{ region.join(' ') || '请选择地区' }}</view>
			</picker>
		</view>

		<view class="filter-item">
			<text class="filter-label">星座</text>
			<picker mode="selector" :range="constellations" @change="onConstellationChange">
				<view class="picker">{{ constellations[constellationIndex] || '请选择星座' }}</view>
			</picker>
		</view>

		<view class="filter-item">
			<text class="filter-label">学历</text>
			<picker mode="selector" :range="educations" @change="onEducationChange">
				<view class="picker">{{ educations[educationIndex] || '请选择学历' }}</view>
			</picker>
		</view>

		<view class="filter-item">
			<text class="filter-label">职业</text>
			<input class="input" v-model="occupation" placeholder="请输入职业" />
		</view>

		<view class="filter-item">
			<text class="filter-label">年收入</text>
			<picker mode="selector" :range="incomes" @change="onIncomeChange">
				<view class="picker">{{ incomes[incomeIndex] || '请选择年收入' }}</view>
			</picker>
		</view>

		<button class="confirm-btn" @click="onConfirm">确认筛选</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			age: 25,
			height: 170,
			region: [],
			constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
			constellationIndex: 0,
			educations: ['高中', '大专', '本科', '硕士', '博士'],
			educationIndex: 0,
			occupation: '',
			incomes: ['10万以下', '10-20万', '20-50万', '50万以上'],
			incomeIndex: 0
		}
	},
	methods: {
		onAgeChange(e) {
			this.age = e.detail.value;
		},
		onHeightChange(e) {
			this.height = e.detail.value;
		},
		onRegionChange(e) {
			this.region = e.detail.value;
		},
		onConstellationChange(e) {
			this.constellationIndex = e.detail.value;
		},
		onEducationChange(e) {
			this.educationIndex = e.detail.value;
		},
		onIncomeChange(e) {
			this.incomeIndex = e.detail.value;
		},
		onConfirm() {
			// 处理筛选逻辑
			uni.navigateBack();
		}
	}
}
</script>

<style>
.filter-page {
	padding: 20px;
}
.filter-item {
	margin-bottom: 20px;
}
.filter-label {
	display: block;
	font-size: 16px;
	margin-bottom: 8px;
	color: #333;
}
.gender-options {
	display: flex;
}
.gender-option {
	margin-right: 20px;
}
.slider-value {
	display: block;
	text-align: center;
	margin-top: 8px;
}
.picker {
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
.input {
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
.confirm-btn {
	margin-top: 30px;
	background-color: #ff6b81;
	color: #fff;
}
</style> 