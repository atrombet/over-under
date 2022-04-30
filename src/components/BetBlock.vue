<template>
  <div class="bet">
    <h3 class="bet__text">"{{ bet.text }}"</h3>
    <div v-if="isGamemaker" class="bet__delete">
      <i class="icon" @click="deleteBet">clear</i>
    </div>
    <div v-if="isGamemaker" class="bet__counter">
      <i class="icon" :disabled="bet.count === 0" @click="decrement">remove</i>
      {{ bet.count }}/<input v-model="overUnder" />
      <i class="icon" @click="increment">add</i>
    </div>
    <div v-else class="bet__counter viewOnly">
      <span>{{ bet.count }}</span>
      <span>/</span>
      <span class="counter">{{ bet.overUnder }}</span>
    </div>
    <div class="bet__result">
      <div v-if="bet.count < overUnder" class="bet__under">under</div>
      <div v-if="bet.count == overUnder" class="bet__push">push</div>
      <div v-if="bet.count > overUnder" class="bet__over">over</div>
    </div>

    <BetSelect v-model="userBetChoice" :bettors="bettors" :readOnly="readOnly" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Bet, User, Bettor } from '@/interfaces';
import { db } from '@/firebase';
import BetSelect from './BetSelect.vue';

export default defineComponent({
  name: 'BetBlock',
  components: {
    BetSelect
  },
  props: {
    isGamemaker: Boolean,
    sessionId: String,
    user: {
      type: Object as PropType<User>,
      default: () => ({})
    },
    bet: {
      type: Object as PropType<Bet>,
      default: () => ({})
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    bettors: [] as Bettor[]
  }),
  firestore() {
    return {
      bettors: db
        .collection('sessions')
        .doc(this.sessionId)
        .collection('bets')
        .doc(this.bet.id)
        .collection('bettors') as unknown as Bettor[]
    };
  },
  computed: {
    betPath() {
      return `sessions/${this.sessionId}/bets/${this.bet.id}`;
    },
    overUnder: {
      get(): number {
        return this.bet.overUnder;
      },
      async set(val: number): Promise<void> {
        await db.doc(this.betPath).set({
          ...this.bet,
          overUnder: val
        });
      }
    },
    userBet(): Bettor | undefined {
      return this.bettors.find(b => b.uid === this.user.uid);
    },
    userBetChoice: {
      get() {
        return this.userBet?.choice;
      },
      async set(choice: 'under' | 'push' | 'over') {
        if (this.userBet) {
          await db.doc(`${this.betPath}/bettors/${this.userBet.id}`).set({
            ...this.userBet,
            choice
          });
        } else {
          const { id } = await db.collection(`${this.betPath}/bettors`).doc();
          await db.doc(`${this.betPath}/bettors/${id}`).set({
            uid: this.user.uid,
            displayName: this.user.displayName,
            choice
          });
        }
        console.log(choice);
      }
    }
  },
  methods: {
    async increment() {
      await db.doc(`sessions/${this.sessionId}/bets/${this.bet.id}`).set({
        ...this.bet,
        count: this.bet.count + 1
      });
    },
    async decrement() {
      await db.doc(`sessions/${this.sessionId}/bets/${this.bet.id}`).set({
        ...this.bet,
        count: this.bet.count - 1
      });
    },
    async deleteBet() {
      await db.doc(`sessions/${this.sessionId}/bets/${this.bet.id}`).delete();
    }
  }
});
</script>

<style lang="scss">
.bet {
  padding: var(--md) var(--xl);
  border: var(--border);
  border-radius: var(--md);
  position: relative;
  text-align: center;

  & i.icon {
    height: var(--xl);
    width: var(--xl);
    line-height: var(--xl);
    border-radius: 50%;
    transition: 0.2s;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    &:hover {
      background-color: #e1e1e1;
      transition: 0.2s;
    }

    &[disabled='true'] {
      pointer-events: none;
      opacity: 0.5;

      &:hover {
        background-color: transparent;
      }
    }
  }

  &__text {
    font-weight: var(--font-weight-bold);
  }

  &__counter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--md);

    & input {
      width: var(--xl);
      font-weight: var(--font-weight-bold);
      text-align: center;
      font-size: var(--font-size-default);
      padding: var(--xs);
    }

    &.viewOnly {
      font-size: var(--font-size-large);

      & .counter {
        font-weight: var(--font-weight-bold);
      }
    }
  }

  &__result {
    margin-top: var(--lg);
  }

  &__under,
  &__push,
  &__over {
    text-transform: uppercase;
    padding: var(--sm);
    border-radius: var(--xs);
    font-weight: var(--font-weight-bold);
  }

  &__under {
    background-color: var(--under-color-trans);
    border: 2px solid var(--under-color);
    color: var(--under-color);
  }

  &__push {
    background-color: var(--push-color-trans);
    border: 2px solid var(--push-color);
    color: var(--push-color);
  }

  &__over {
    background-color: var(--over-color-trans);
    border: 2px solid var(--over-color);
    color: var(--over-color);
  }

  &__delete {
    position: absolute;
    top: var(--sm);
    right: var(--sm);
    color: #e28680;
  }
}
</style>
