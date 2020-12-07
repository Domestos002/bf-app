import axios from 'axios'
import settings from '@/settings'
import Pagination from "../../components/Pagination/Pagination.vue";
import {formatDate} from "../../helpers";
import SvgIcon from "../../components/SvgIcon/SvgIcon";

export default {
    name: 'List',

    data() {
      return {
          links: [],
          list: null,
          meta: {
              current_page: 1,
              last_page: 0,
          },
      }
    },

    components: {
        Pagination, SvgIcon
    },

    mounted() {
        this.getPage(this.meta.current_page)
    },
    methods: {
        changePage(num) {
            this.getPage(num);
            this.meta.current_page = num
        },

        getPage(num) {
            axios({
                method: 'get',
                url: `${settings.apiAddress}/verification?page=${num}`,
            })
            .then(response => {
                this.list = response.data.data;
                this.links = response.data.links;
                this.meta = response.data.meta;
            })
            .then(() => {
                this.list = this.list.map(el => {
                    el.status = settings.statuses[parseInt(el.status)];
                    el.expired_at = formatDate(el.expired_at);
                    return el;
                });
            })
        }
    }
}
