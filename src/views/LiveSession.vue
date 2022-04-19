<template>
  <div v-if="session" class="page liveSession">
    <router-link :to="{ name: 'Home' }">
      <div class="page__backToHome"><i class="icon">chevron_left</i>Home</div>
    </router-link>
    <h1 class="liveSession__heading">
      <span>{{ session.name }}</span>
      <SessionAccessTag v-model="isGamemaker" />
    </h1>
    <div class="liveSession__participants"></div>
    <AddBet v-if="isGamemaker" @addNewBet="addNewBet" />
    <div class="liveSession__bets">
      <template v-if="!!bets.length">
        <BetBlock
          v-for="bet in bets"
          :key="bet.id"
          :bet="bet"
          :sessionId="sessionId"
          :isGamemaker="isGamemaker"
          :user="user"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { db } from '@/firebase';
import { Session, Bet } from '@/interfaces';
import { AddBet, BetBlock, SessionAccessTag } from '@/components';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'LiveSession',
  components: {
    AddBet,
    BetBlock,
    SessionAccessTag
  },
  data: () => ({
    session: null as null | Session,
    bets: null as null | Bet[]
  }),
  computed: {
    ...mapState(useAuthStore, ['user']),
    sessionId() {
      return this.$route.params.sessionId;
    },
    betsCollection() {
      return db.doc(`sessions/${this.sessionId}`).collection('bets');
    },
    isGamemaker() {
      return this.session?.owner === this.user?.uid;
    }
  },
  firestore() {
    return {
      session: db.doc(`sessions/${this.sessionId}`),
      bets: this.betsCollection
    };
  },
  methods: {
    async addNewBet(text: string) {
      const { id } = this.betsCollection.doc();
      try {
        await this.betsCollection.doc(id).set({
          text,
          count: 0,
          overUnder: 0
        });
      } catch (error) {
        alert(error);
      }
    }
  }
});
</script>

<style lang="scss">
.liveSession {
  display: flex;
  flex-direction: column;

  &__heading {
    display: flex;
    gap: var(--xl);
  }

  &__participants {
    color: var(--gray);
  }

  &__bets {
    margin-top: var(--xl);
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--lg);
  }
}
</style>
