<!-- src/views/QuestionDetail.vue -->
<template>
  <div v-if="question">
    <h1>{{ question.subject }}</h1>
    <p>{{ question.content }}</p>
    <p>작성일: {{ formattedCreateDate }}</p>
    <button @click="goBack">목록으로</button>
    <hr/>
    <h2>답변 목록</h2>
    <ul>
      <li v-for="answer in question.answerList" :key="answer.id">
        <p>{{ answer.content }}</p>
        <p>작성일: {{ formatDate(answer.createDate) }}</p>
        <button @click="deleteAnswerHandler(answer.id)">삭제</button>
      </li>
    </ul>
    <hr/>
    <h3>답변 등록</h3>
    <form @submit.prevent="createAnswerHandler">
      <div>
        <label for="answerContent">내용:</label>
        <textarea
            id="answerContent"
            v-model="answerContent"
            required
        ></textarea>
      </div>
      <button type="submit">등록</button>
    </form>
  </div>
  <div v-else>
    <p>로딩 중...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Question, AnswerForm } from '../types';
import { getQuestion, deleteAnswer, createAnswer } from '../services/api';

export default defineComponent({
  name: 'QuestionDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const question = ref<Question | null>(null);
    const answerContent = ref<string>('');

    const fetchQuestion = async (id: number) => {
      try {
        const response = await getQuestion(id);
        question.value = response.data;
      } catch (error) {
        console.error('질문 상세 정보 가져오기 실패:', error);
      }
    };

    const deleteAnswerHandler = async (id: number) => {
      if (confirm('정말로 삭제하시겠습니까?')) {
        try {
          await deleteAnswer(id);
          if (question.value) {
            question.value.answerList = question.value.answerList.filter(
                (answer) => answer.id !== id
            );
          }
        } catch (error) {
          console.error('답변 삭제 실패:', error);
        }
      }
    };

    const createAnswerHandler = async () => {
      if (!question.value) return;
      const payload: AnswerForm = {
        content: answerContent.value,
        questionId: question.value.id,
      };
      try {
        await createAnswer(payload);
        answerContent.value = '';
        await fetchQuestion(question.value.id);
      } catch (error) {
        console.error('답변 등록 실패:', error);
      }
    };

    const goBack = () => {
      router.back();
    };

    const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formattedCreateDate = computed(() => {
      return question.value
          ? formatDate(question.value.createDate)
          : '';
    });

    onMounted(() => {
      const id = Number(route.params.id);
      if (isNaN(id)) {
        console.error('유효하지 않은 질문 ID');
        return;
      }
      fetchQuestion(id);
    });

    watch(
        () => route.params.id,
        (newId) => {
          const id = Number(newId);
          if (!isNaN(id)) {
            fetchQuestion(id);
          }
        }
    );

    return {
      question,
      answerContent,
      deleteAnswerHandler,
      createAnswerHandler,
      goBack,
      formatDate,
      formattedCreateDate,
    };
  },
});
</script>

<style scoped>
/* 스타일 추가 */
</style>
