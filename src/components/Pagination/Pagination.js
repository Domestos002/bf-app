import { eventDelegate } from '@/helpers'

export default {
    name: 'Pagination',

    props: {
        nearbyPagesLimit: {
            type: Number,
            default: 3
        },
        currentPage: {
            type: Number,
            default: 1
        },
        lastPage: {
            type: Number,
            default: 1
        },
    },

    data() {
        return {
        }
    },

    components: {
    },

    methods: {
        nextPage() {
            this.$emit('changePage', this.currentPage + 1)
        },

        prevPage() {
            this.$emit('changePage', this.currentPage - 1)
        },

        onClick(e) {
            eventDelegate(e, '.pagination__link', target => {
                this.$emit('changePage', parseInt(target.dataset.num))
            });
        },

        getFirstEllipsis(index) {
            return (this.currentPage - this.nearbyPagesLimit) - index === 0 && index > 1
        },

        getLastEllipsis(index) {
            return (this.currentPage + this.nearbyPagesLimit) - index === 0
                && (this.currentPage + this.nearbyPagesLimit) < this.lastPage
        },

        getPage(index) {
            return (this.currentPage - this.nearbyPagesLimit) - index < 0
                && (this.currentPage + this.nearbyPagesLimit) - index > 0
        }
    }
}
