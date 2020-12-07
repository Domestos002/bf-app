import SvgIcon from "../SvgIcon/SvgIcon.vue";
import Selector from "../Selector/Selector.vue";

export default ({
    name: 'Modal',
    data() {
        return {
            currentCoordinator: {}
        };
    },

    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
        coordinatorList: {
            type: Array,
            default: [],
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
            this.$emit('submit', this.currentCoordinator);
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
        }
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
            } else {
                document.body.classList.remove('ovh');
                document.body.style.paddingRight = '';
            }
        },
    },
});
