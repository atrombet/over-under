<template>
  <div v-if="Object.keys(session).length" class="page liveSession">
    <router-link :to="{ name: 'Home' }">
      <div class="page__backToHome"><i class="icon">chevron_left</i>Home</div>
    </router-link>
    <h1 class="liveSession__heading">
      <span>{{ session.name }}</span>
      <SessionAccessTag v-model="isGamemaker" class="liveSession__accessTag" />
    </h1>
    <StatusBlock
      :session="session"
      :isGamemaker="isGamemaker"
      @closeBetting="closeBetting"
      @openBetting="openBetting"
      @complete="complete"
    />
    <div class="liveSession__participants"></div>
    <AddBet v-if="isGamemaker && !session.completedAt" @addNewBet="addNewBet" />
    <div class="liveSession__bets">
      <template v-if="!!bets.length">
        <BetBlock
          v-for="bet in bets"
          :key="bet.id"
          :bet="bet"
          :sessionId="sessionId"
          :isGamemaker="isGamemaker"
          :user="user"
          :readOnly="!!session.bettingClosedAt"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AddBet, BetBlock, SessionAccessTag, StatusBlock } from '@/components';
import { useSession } from '@/composables';
import { db } from '@/firebase';
import { Session } from '@/interfaces';

const { sessionId, betsCollection, session, bets, user, isGamemaker } = useSession();

const addNewBet = async (text: string) => {
  const { id } = betsCollection.value.doc();
  try {
    await betsCollection.value.doc(id).set({
      text,
      count: 0,
      overUnder: 0
    });
  } catch (error) {
    alert(error);
  }
};

const closeBetting = async () => {
  await db.doc(`sessions/${sessionId.value}`).set({
    ...session.value,
    bettingClosedAt: Date.now()
  } as Session);
};

const openBetting = async () => {
  await db.doc(`sessions/${sessionId.value}`).set({
    ...session.value,
    bettingClosedAt: null
  } as Session);
};

const complete = async () => {
  await db.doc(`sessions/${sessionId.value}`).set({
    ...session.value,
    completedAt: Date.now()
  } as Session);
};
</script>

<style lang="scss">
.liveSession {
  display: flex;
  flex-direction: column;

  &__heading {
    display: flex;
    gap: var(--xl);
  }

  &__accessTag {
    flex-grow: 1;
  }

  &__gamemakerActions {
    display: flex;
    gap: var(--md);
  }

  &__status {
    padding: var(--md);
    border-radius: var(--xs);
    background-color: var(--gray-lightest);
    width: fit-content;
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
