import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { User } from '@/interfaces';

export const useAuthStore = defineStore('auth', {
  /*************************************
   * STATE
   *************************************/

  state: () => ({
    user: null as User | null,
    error: null as any
  }),

  /*************************************
   * ACTIONS
   *************************************/

  actions: {
    /**
     * Watches for auth state changes from firebase.
     */
    bindUser() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.user = user;
          this.router.push({ name: 'Home' });
        } else {
          this.logout();
        }
      });
    },
    /**
     * Registers a new user.
     * @param {string} email Email of the user.
     * @param {string} password Password for the new user's account.
     */
    async register(email: string, password: string): Promise<void> {
      this.error = null;
      try {
        await auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        this.error = error;
      }
    },
    /**
     * Logs in a registered user.
     * @param {string} email The user's entered email.
     * @param {string} password The user's entered password.
     */
    async login(email: string, password: string): Promise<void> {
      this.error = null;
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        this.error = error;
      }
    },
    /**
     * Logs out the current user and returns to the login screen.
     */
    async logout(): Promise<void> {
      await auth.signOut();
      this.$reset();
      this.router.push({ name: 'Login' });
    },
    /**
     * Update's the user's profile information.
     * @param {string} displayName The user's display name.
     * @param {string} photoURL The url of a photo to display for this user.
     * @returns {Promise<string>} A string describing the result of the operation.
     */
    async updateUser(displayName?: string, photoURL?: string): Promise<string> {
      try {
        await this.user?.updateProfile({ displayName, photoURL });
        return 'Success!';
      } catch {
        return 'A problem occurred.';
      }
    }
  }
});
