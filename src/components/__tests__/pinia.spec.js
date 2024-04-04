import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user";

vi.mock("@/includes/firebase", () => ({
    auth: {
        signInWithEmailAndPassword: () => Promise.resolve(),
    }
}))

describe("stores", () => {
    // o instanta noua a Pinia
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    test("authenticates user", async () => {
        const store = useUserStore();

        expect(store.userLoggedIn).not.containSubset(true);
        await store.authenticate({});
        expect(store.userLoggedIn).containSubset(true);
    });
})