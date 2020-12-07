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

    data() {
      return {
          coordinatorList: [],
          contact_name: '',
          contact_email: '',
          coordinator: {},
          oldCoordinator: null,
          created_at: '',
          expired_at: '',
          updated_at: '',
          organization_name: '',
          status: '',
          showModal: false
      }
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            this.getVerifications();
            this.getCoordinators();
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
                this.oldCoordinator = this.coordinator;
            });
        },

        getCoordinators() {
            axios({
                method: 'get',
                url: `${settings.apiAddress}/coordinator`,
            })
            .then(response => this.coordinatorList = response.data.data);
        },

        updateCoordinator(val) {
            axios({
                method: 'put',
                url: `${settings.apiAddress}/verification/${this.$attrs.id}`,
                data: {
                    coordinator: val,
                    status: 1,
                }
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
            this.coordinator = val;
            this.toggleModal();
        },

        onSubmit() {
            if(this.oldCoordinator.id !== this.coordinator.id) {
                this.updateCoordinator(this.coordinator);
                this.oldCoordinator = this.coordinator;
            }
        }
    }
}
