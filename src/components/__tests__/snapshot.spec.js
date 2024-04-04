import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('SongItem.vue', () => {
    test('renders song.display_name', () => {

        const song = {
            docID: 'abc',
            modified_name: 'test', 
            display_name: 'test', 
            comment_count: 5
        };

        const wrapper = shallowMount(SongItem, {
            props: {
                song
            }, 
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    })

})