<!-- src/views/QuestionCreate.vue -->
<template>
  <div>
    <h1>질문 등록</h1>
    <form @submit.prevent="createQuestionHandler">
      <div>
        <label for="subject">제목:</label>
        <input
            type="text"
            id="subject"
            v-model="subject"
            required
            maxlength="200"
        />
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>
      <button type="submit">등록</button>
      <button type="button" @click="goBack">취소</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createQuestion } from '../services/api';
import { useRouter } from 'vue-router';
import { QuestionForm } from '../types';

export default defineComponent({
  name: 'QuestionCreate',
  setup() {
    const subject = ref<string>('');
    const content = ref<string>('');
    const router = useRouter();

    const createQuestionHandler = async () => {
      const payload: QuestionForm = {
        subject: subject.value,
        content: content.value,
      };
      try {
        await createQuestion(payload);
        router.push({ name: 'QuestionsList' });
      } catch (error) {
        console.error('질문 등록 실패:', error);
      }
    };

    const goBack = () => {
      router.back();
    };

    return {
      subject,
      content,
      createQuestionHandler,
      goBack,
    };
  },
});
</script>

<style scoped>
/* 스타일 추가 */
</style>
