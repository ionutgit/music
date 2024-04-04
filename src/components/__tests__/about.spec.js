import About from '@/views/About.vue';
import { shallowMount } from '@vue/test-utils'

//describe: o suita de teste
//2 argumente: 1. numele 2. callback function
describe('About.vue', () => {
    test('renders inner text', () => {

        // mount: monteaza componenta
        //shalowMount: nu da voie sa ai mai multe nivele de component ca si copii
        const wrapper = shallowMount(About);

        expect(wrapper.text()).toContain('about');
    })
})