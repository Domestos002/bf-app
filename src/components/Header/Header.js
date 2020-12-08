import SvgIcon from '@components/SvgIcon/SvgIcon.vue'
import axios from "axios";
import settings from "../../settings";

export default {
    name: "Header",

    data() {
        return {
            user: null,
        }
    },

    mounted() {
        this.getUser();
    },

    components: {
        SvgIcon
    },

    methods: {
        getUser() {
            axios({
                method: 'get',
                url: `${settings.apiAddress}/user/1`
            })
            .then(response => this.user = response.data.data)
        }
    }
}
