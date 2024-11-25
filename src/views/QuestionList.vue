<!-- src/views/QuestionList.vue -->
<template>
  <div>
    <h1>질문 목록</h1>
    <button @click="goToCreate">질문 등록</button>
    <ul>
      <li v-for="question in questions" :key="question.id">
        <router-link :to="{ name: 'QuestionDetail', params: { id: question.id } }">
          {{ question.subject }}
        </router-link>
        <button @click="deleteQuestionHandler(question.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Question } from '../types';
import { getQuestions, deleteQuestion } from '../services/api';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'QuestionList',
  setup() {
    const questions = ref<Question[]>([]);
    const router = useRouter();

    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        questions.value = response.data;
      } catch (error) {
        console.error('질문 목록 가져오기 실패:', error);
      }
    };

    const deleteQuestionHandler = async (id: number) => {
      if (confirm('정말로 삭제하시겠습니까?')) {
        try {
          await deleteQuestion(id);
          await fetchQuestions();
        } catch (error) {
          console.error('질문 삭제 실패:', error);
        }
      }
    };

    const goToCreate = () => {
      router.push({ name: 'QuestionCreate' });
    };

    onMounted(() => {
      fetchQuestions();
    });

    return {
      questions,
      deleteQuestionHandler,
      goToCreate,
    };
  },
});
</script>

<style scoped>
/* 스타일 추가 */
</style>
