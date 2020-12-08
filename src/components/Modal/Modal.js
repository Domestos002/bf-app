import SvgIcon from "../SvgIcon/SvgIcon.vue";
import Selector from "../Selector/Selector.vue";
import axios from "axios";
import settings from "../../settings";

export default ({
    name: 'Modal',
    data() {
        return {
            coordinatorList: [],
            currentCoordinator: {}
        };
    },

    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
        coordinator: {
            type: Object,
            default: {},
        },
    },

    components: {
        SvgIcon,
        Selector
    },

    methods: {
        closeModal() {
            this.currentCoordinator = this.coordinator;
            this.$emit('closeModal');
        },
        onClick(e) {
            //клик вне модалки
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        },
        onSubmit() {
            if(this.currentCoordinator.id !== this.coordinator.id) {
                this.$emit('submit', this.currentCoordinator);
            }
        },

        getScrollbarWidth() {
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll';
            outer.style.msOverflowStyle = 'scrollbar';
            document.body.appendChild(outer);

            const inner = document.createElement('div');
            outer.appendChild(inner);

            const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
            outer.parentNode.removeChild(outer);

            return scrollbarWidth;
        },

        getCoordinators() {
            axios({
                method: 'get',
                url: `${settings.apiAddress}/coordinator`,
            })
            .then(response => this.coordinatorList = response.data.data);
        },
    },

    watch: {
        coordinator: {
            handler() {
                this.currentCoordinator = this.coordinator
            },
            immediate: true
        },

        showModal(val) {
            if (val) {
                document.body.classList.add('ovh');
                document.body.style.paddingRight = `${this.getScrollbarWidth()}px`;

                if(!this.coordinatorList.length) {
                    this.getCoordinators();
                }
            } else {
                document.body.classList.remove('ovh');
                document.body.style.paddingRight = '';
            }
        },
    },
});
