import { defineStore } from 'pinia';
import { Term } from '../interfaces';

export const useTermStore = defineStore('term', {
  state: () => ({
    /** @type {Term[]} */
    terms: [] as Term[],
    nextId: 0
  }),
  actions: {
    /**
     * Creates a new term with initial values and the given text.
     * @param text The text value of the new term to add.
     */
    createNewTerm(text: string): void {
      this.terms.push({ id: this.nextId++, text, count: 0, overUnder: 0 });
    },
    /**
     * Sets the overUnder value for a given term.
     * @param id The id of the term.
     * @param overUnder The value to set as the overUnder.
     */
    setOverUnder(id: number, overUnder: number): void {
      (this.terms.find(t => t.id === id) as Term).overUnder = overUnder;
    },
    /**
     * Increments the count of the given term.
     * @param id The id of the term.
     */
    increment(id: number): void {
      (this.terms.find(t => t.id === id) as Term).count++;
    },
    /**
     * Decrements the count of the given term.
     * @param id The id of the term.
     */
    decrement(id: number): void {
      (this.terms.find(t => t.id === id) as Term).count--;
    },
    /**
     * Deletes the given term.
     * @param id The id of the term.
     */
    deleteTerm(id: number): void {
      const index = this.terms.findIndex(t => t.id === id);
      this.terms.splice(index, 1);
    }
  }
});
