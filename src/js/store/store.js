import Vuex from 'vuex';
import {ui} from '@store/ui';

export default function() {
    return new Vuex.Store({
        modules: {
            ui,
        },
    });
}