import axios from "axios";
import settings from "../../settings";
import {formatDate} from "../../helpers";
import Modal from "../../components/Modal/Modal.vue";
import Selector from "../../components/Selector/Selector.vue";


export default {
    name: 'Detail',
    components: {
        Modal,
        Selector
    },

    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },

    data() {
      return {
          contact_name: null,
          contact_email: null,
          coordinator: {},
          created_at: null,
          expired_at: null,
          updated_at: null,
          organization_name: null,
          status: null,
          showModal: false
      }
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            this.getVerifications();
        },

        getVerifications() {
            axios({
                method: 'get',
                url: `${settings.apiAddress}/verification/${this.$attrs.id}`,
            })
            .then(response => {
                for (let key in response.data.data) {
                    if (response.data.data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                        this[key] = response.data.data[key];
                    }
                }

                this.status = settings.statuses[parseInt(response.data.data.status)];
                this.created_at = formatDate(this.created_at);
                this.updated_at = formatDate(this.updated_at);
                this.expired_at = formatDate(this.expired_at);
            });
        },


        updateCoordinator(coordinator = null, status = null) {
            let data = {};

            if(coordinator) {
                data.coordinator = coordinator
            }

            if(status) {
                data.status = status
            }

            axios({
                method: 'put',
                url: `${settings.apiAddress}/verification/${this.$attrs.id}`,
                data: data
            })
            .then(response => {
                if(response.status === 200) {
                    this.$toast.success('Запись изменена')
                } else {
                    this.$toast.error('Что-то пошло не так')
                }
            })
        },

        toggleModal() {
            this.showModal = !this.showModal;
        },

        changeCoordinator(val) {
            this.toggleModal();
            this.coordinator = val;
            this.updateCoordinator(val);
        },

        onSubmit() {
            if(this.status.val === 0) {
                this.updateCoordinator(null, 1);
            } else {
                this.$toast.info('Уже на доработке')
            }
        }
    }
}
