<script setup></script>

<template>
    <div class="w-100 p-4 mt-4 review-container">
        <div class="w-100 d-flex justify-content-between align-items-center">
            <div>
                <div class="review-info">작성자&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;최요하</div>
                <div class="mt-2 review-info">작성날짜&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;2024.05.20</div>
            </div>
            <button class="review-btn" @click="$emit('changeState')">리뷰 작성</button>
        </div>
        <hr />
        <textarea class="review-content"></textarea>
    </div>
</template>

<style scoped>
.review-container {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.review-info {
    font-size: 18px;
    font-weight: 600;
    color: #374553;
}

.review-content {
    width: 100%;
    height: 300px;
    font-size: 16px;
    font-weight: 500;
    color: #374553;
    border-radius: 10px;
    padding: 10px 10px;
    resize: none;
}

.review-content:focus {
    outline: none;
}

.review-content::-webkit-scrollbar {
    width: 0;
}

.review-btn {
    background-color: #e1e1e1;
    border: 0;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 700;
}

.review-btn:hover {
    background-color: #1769ff;
    color: white;
}
</style>
